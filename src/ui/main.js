import { React, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Api from "./Api.js";
import App from "./App.js";

async function main() {
  const newDeck = await Api.deck(); //creating a new Deck
  const newDeckId = newDeck.deck_id //store DeckId
  console.log(newDeck);

  const fetchedDeck = await Api.deck("1234"); // given an id, "1234", default method is run
  const fetchedDeckId = fetchedDeck.deck_id;
  console.log(fetchedDeck);

  // let the server deal the hand
  const initialCards = await Promise.all([
    // note: this is still calling the v1 APIs
    //Api.deal()
    // changed this to V2, make sure id and count is known
    Api.dealV2(newDeckId, 5),  // I know we were only supposed to need one API call, but I was unable to figure out why count wasn't working
    Api.dealV2(newDeckId, 5), 
    Api.dealV2(newDeckId, 5), 
    Api.dealV2(newDeckId, 5), 
    Api.dealV2(newDeckId, 5)
    //Api.dealV2(fetchedDeckId, 5)
  ]);
  console.log(initialCards);

  // create React elements
  const root = createRoot(document.getElementById("app"));
  root.render(<App initialCards={initialCards} />); //Renders App component to root container
}

window.onload = main;
