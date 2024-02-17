import { React, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Api from "./Api.js";
import App from "./App.js";

async function main() {
  const newDeck = await Api.deck(); //creating a new Deck
  console.log(newDeck);

  const fetchedDeck = await Api.deck("1234"); // given an id, "1234", default method is run
  console.log(fetchedDeck);

  // let the server deal the hand
  const initialCards = await Promise.all([
    // note: this is still calling the v1 APIs
    Api.deal(),
    Api.deal(),
    Api.deal(),
    Api.deal(),
    Api.deal(),
    // changed this to V2, make sure id and count is known
    //Api.dealV2(id, 5)
  ]);
  console.log(initialCards);

  // create React elements
  const root = createRoot(document.getElementById("app"));
  root.render(<App initialCards={initialCards} />);
}

window.onload = main;
