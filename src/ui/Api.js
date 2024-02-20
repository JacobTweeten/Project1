export default class Api {
  static async deal() {
    const resp = await fetch("/api/v1/deal");
    const card = await resp.json();
    return card;
  }

  static async deck(deck_id) {
    // while testing things out, you can override response to be whatever you want
    if (typeof deck_id === "undefined") {
      // here we assume we want to create a new deck
      const resp = await fetch("/api/v2/deck/new", { method: "POST" });
      const response = await resp.json();
      return response;
    } else if (typeof deck_id === "string") {
      // the default method for fetch is GET
      const resp = await fetch(`/api/v2/deck/${deck_id}`);
      const response = await resp.json();
      return response;
    }

    throw new Error(`expected string, received ${typeof id}`);
  }

  static async dealV2(deck_id, count) {
    // while testing things out, you can override response to be whatever you want

    if (typeof deck_id !== "string" || typeof count !== "number") {
      throw new Error(
        "dealV2 requires a deck id and a number representing how many cards should be dealt"
      );
    }
    // implementing the count feature to draw cards equal to count
    const resp = await fetch(`/api/v2/deck/${deck_id}/deal?count=${count}`, {
      method: "POST",
    });
    const response = await resp.json();
    return response;
  }
}
