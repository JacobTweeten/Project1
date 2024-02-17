import React, { useState } from "react";
//This button is supposed to completely reset the game(?), not sure how to connect it to the App.js file

const DrawButton = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(false);
}

async function drawCards(){
  // Simulate drawing cards (replace with actual logic)
  const newCards = ["2H", "3C", "4D", "5S", "AH"]; // Example cards

  // Check if there's an Ace in the drawn cards
  const hasAce = newCards.some((card) => card.includes("A"));

  // If there's an Ace, discard all non-Ace cards
  const filteredCards = hasAce ? newCards.filter((card) => card.includes("A")) : newCards;

  setCards(filteredCards);
  setDrawn(true);
};

async function playAgain(){
  //resetting the game generates a deck again?
  const newDeck = await Api.deck(); 
  console.log(newDeck);
  setCards([]);
  setSelected(false);
}

return (
  <div>
    {drawn ? (
      <button onClick={playAgain}>Play Again?</button>
    ) : (
      <button onClick={drawCards}>Draw</button>
    )}
    {cards.length > 0 && (
      <div>
        <h2>Drawn Cards:</h2>
        <ul>
          {cards.map((card, index) => (
            <li key={index}>{card}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);


//how to make a button
/*function DrawButton({ onClick }) {
  return <button onClick={onClick}>Play Again?</button>;
}*/

export default DrawButton;
