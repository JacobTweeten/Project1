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

# TODO: remove once front end calls are made to v2
@app.get("/api/v1/hello")
async def api_v1():
    return {"message": "Hello World!"}

# TODO: remove once front end calls are made to v2
@app.get("/api/v1/deal")
async def api_v1_deal(): 
    return {"rank": random.choice(RANKS), "suit": random.choice(SUITS)}



@app.post("/api/v2/deck/new")
async def api_v2_deck_new():
    #creates a new instance of a deck
    deck = Deck()
    decks[deck.deck_id] = deck #storing the new deck in dictionary, using it's id
    print(deck.deck_id+ "This is the new deck id")
    return {"deck_id": deck.deck_id, "message": "Deck created!"}


@app.get("/api/v2/deck/{deck_id}")
async def api_v2_deck(deck_id: str):
    print(f"need to fetch Deck {deck_id}")
    if deck_id not in decks:
        raise HTTPException(status_code=404, detail=f"ERROR: Deck {deck_id} not found")
    return {"deck_id": deck_id, "message": "Deck was found!"} #returns the decks id
    


@app.post("/api/v2/deck/{deck_id}/deal?count=${count}")
async def api_v2_deck(deck_id: str, count: int):
    print(f"need to deal {count} cards from {deck_id}")
    if deck_id not in decks:
        raise HTTPException(status_code=404, detail=f"ERROR: Deck {deck_id} not found")
    
    deck = decks[deck_id] #sets the deck to the correct deck according to the id
    dealt_cards = []

    for _ in range(count):
        try:
            card = deck.deal()
            dealt_cards.append({"rank": card.rank, "suit": card.suit}) 
        except ValueError:
            raise HTTPException(status_code=400, detail="ERROR: Not enough cards in the deck")

    return {"deck_id": deck_id, "dealt_cards": dealt_cards}

app.mount("/", StaticFiles(directory="ui/dist", html=True), name="ui")