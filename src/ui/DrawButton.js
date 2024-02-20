import { useState } from "react";
import Api from "./Api.js";

const DrawButton = () => {
  const [cards, setCards] = useState([]);
  const [drawn, setDrawn] = useState(false);

  async function drawCards() {
    const newCards =  cards.dealt_cards;
    //Collect the number of cards equal to count and store them in new cards

    const shouldReset = newCards.includes("A"); 

    let filteredCards = [];
  if (shouldReset) {
    // If there is an Ace, discard all non-Ace cards
    filteredCards = newCards.filter((card) => card.includes("A")); //Used Chat GPT to figure out how to tell if an Ace was in hand
  } else {
    // Discard at most 3 non-Ace cards
    const nonAceCards = newCards.filter((card) => !card.includes("A"));
    filteredCards = nonAceCards.slice(0, 3);
  }

    setCards(newCards);
    setDrawn(true);

    // Reset the game if the condition is met
    if (shouldReset) {
      playAgain();
    }
  }

  async function playAgain() { // creates a new deck 
    const newDeck = await Api.deck(); // not actually reseting the deck?
    console.log(newDeck);

    setCards([]);
    setDrawn(false);
  }

  return (
    <div>
      {drawn ? (
        <button onClick={playAgain}>Play Again?</button> //Switches from Draw to Play Again when clicked, but doesn't reset
      ) : (
        <button onClick={drawCards}>Draw</button>
      )}
        <div>
          <h2>All Hand Ranks:</h2>
          <ul>
            <p>High Card = No correlation</p>
            <p>Straight = Numbers in Accending Order and Alternating Colors</p>
            <p>Straight Flush = Numbers in Accending Order and Same Color</p>
            <p>One Pair = A pair of the same rank, but different suits</p>
            <p>Two Pair = Two pairs of same rank, but different suits</p>
            <p>Three-of-a-Kind = Three of the same rank in different suits</p>
            <p>Four-of-a-Kind = Four of the same rank in different suits</p>
            <p>Five-of-a-Kind = Five of the same rank in different suits</p>
            <p>Royal Flush = Ace, King, Queen, Joker and a 10 of the same suit</p>
            <p>Flush = All cards are apart of the same symbol or suit</p>
            <p>Full House = Hand consists of a Three-of-a-Kind and One Pair</p>


          </ul>
        </div>
    </div>
  );
};

export default DrawButton;
