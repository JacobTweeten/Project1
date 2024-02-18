import { useState } from "react";
import Card from "./Card.js";
import Api from "./Api.js";
import DrawButton from "./DrawButton.js";

//This class should manage the ids of different games going on at the same time?
//Deal methods make Api calls

export default class Deck {

  //deck constructor
  constructor(id){
    this.id = id; // unique id for a specific game session created by client
    this.cards = [];
    this.deckId = null; // unique id for a deck in the server
  }

  //Api calls

  static async create(){ 
    //Each instance of a deck would need its own id, which is what this does?
    //Should this the same way Api.deck(id) runs?
    if (typeof id === "undefined") {
      // here we assume we want to create a new deck
      const resp = await fetch("/api/v2/deck/new", { method: "POST" });
      const response = await resp.json();
      this.deckId = response.deckId;
      return this.deckId;
    } else if (typeof id === "string") {
      // the default method for fetch is GET
      const resp = await fetch(`/api/v2/deck/${id}`);
      const response = await resp.json();
      this.deckId = response.deckId;
      return this.deckId;
    }
    throw new Error(`expected string, received ${typeof id}`);
  }

  static async dealV2(id, count) {
    if (typeof id !== "string" || typeof count !== "number") {
      throw new Error(
        "dealV2 requires a deck id and a number representing how many cards should be dealt"
      );
    }
    // implementing the count feature to draw cards equal to count
    const resp = await fetch(`/api/v2/deck/${id}/deal?count=${count}`);
    const response = await resp.json();
    this.cards = response.cards;
    return this.cards;
  }

  static async draw(){
    const resp = await fetch(`/api/v2/deck/${id}/DrawButton`);
    const response = await resp.json();
    const card = response.card;
    this.cards.push(card);
    return card;
  }

  static async shuffle(){
    const resp = await fetch(`/api/v2/deck/${id}/shuffle`);
    const response = await resp.json();
    return response;


  }

  }

