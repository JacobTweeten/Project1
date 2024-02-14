import asyncio
import asyncpg
import random
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from deck import Deck

SUITS = ["C", "D", "H", "S"]
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]

app = FastAPI()
# adding dictionary to store list of decks
decks = {}

#need to remove once front end calls are made to v2
@app.get("/api/v1/hello")
async def api_v1():
    return {"message": "Hello World!"}

#need to remove once front end calls are made to v2
@app.get("/api/v1/deal")
async def api_v1_deal(): 
    return {"rank": random.choice(RANKS), "suit": random.choice(SUITS)}



@app.post("/api/v2/deck/new")
async def api_v2_deck_new():
    #creates a new instance of a deck
    deck = Deck()
    decks[deck.deck_id] = deck #storing the new deck in dictionary, using it's id
    print(deck.deck_id)
    return {"deck_id": deck.deck_id, "message": "Deck created!"}


@app.get("/api/v2/deck/{deck_id}")
async def api_v2_deck(deck_id: str):
    print(f"need to fetch Deck {deck_id}")
    if deck_id not in decks:
        raise HTTPException(status_code=404, detail=f"ERROR: Deck {deck_id} not found")
    return {"deck_id": deck_id, "message": "Deck was found!"} #returns the decks id
    


@app.post("/api/v2/deck/{deck_id}/deal")
async def api_v2_deck(deck_id: str, count: int):
    print(f"need to deal {count} cards from {deck_id}")
    if deck_id not in decks:
        raise HTTPException(status_code=404, detail=f"ERROR: Deck {deck_id} not found")
    deck = decks[deck_id]

    dealt_cards = []
    used_cards = set() #use a set to keep track of cards that are used
    for _ in range(count): #deal count amount of cards
        try:
            card = deck.deal()
            while card in used_cards: #if card is in the set of used cards, deal a different card
                card = deck.deal()

            used_cards.add(card)  # Add the dealt card to the used cards set
            dealt_cards.append({"rank": card.rank, "suit": card.suit}) #add the dealt card
        except ValueError:
            raise HTTPException(status_code=400, detail="ERROR: Not enough cards in the deck")

    return {"deck_id": deck_id, "dealt_cards": dealt_cards} #returns the deck_id and the cards that were requested
    


app.mount("/", StaticFiles(directory="ui/dist", html=True), name="ui")
