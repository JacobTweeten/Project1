from card import Card
import random #used for shuffling the cards
import string #used for generating the id with characters and numbers (learned from chatgpt)

class Deck:
    def __init__(self):
        print("Deck constructor") #generates all 52 cards
        self.cards = [Card(rank, suit) for suit in ["C", "D", "H", "S"] for rank in ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]]
        random.shuffle(self.cards) # shuffle cards
        self.deck_id = self.generate_deck_id() #generate deck id

    def shuffle(self): #defines the shuffle function for the deck
        random.shuffle(self.cards)


    def deal(self): #defines the deal function for the deck
        if not self.cards:
            raise ValueError("Deck is empty")
        return self.cards.pop()
    
    def generate_deck_id(self):
        # Generate a random string with the specified length
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(12)) #chatgpt said it should be 12 chracters long


    


