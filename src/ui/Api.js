export default class Api {
  static async deal() {
    const resp = await fetch("/api/v1/deal");
    const card = await resp.json();
    return card;
  }

  static async deck(id) {
    // while testing things out, you can override response to be whatever you want
    if (typeof id === "undefined") {
      // here we assume we want to create a new deck
      const resp = await fetch("/api/v2/deck/new", { method: "POST" });
      const response = await resp.json();
      return response;
    } else if (typeof id === "string") {
      // the default method for fetch is GET
      const resp = await fetch(`/api/v2/deck/${id}`);
      const response = await resp.json();
      return response;
    }

    throw new Error(`expected string, received ${typeof id}`);
  }

  static async dealV2(id, count) {
    // while testing things out, you can override response to be whatever you want

    if (typeof id !== "string" || typeof count !== "number") {
      throw new Error(
        "dealV2 requires a deck id and a number representing how many cards should be dealt"
      );
    }
    // implementing the count feature to draw cards equal to count
    const resp = await fetch(`/api/v2/deck/${id}/deal?count=${count}`, {
      method: "POST",
    });
    const response = await resp.json();
    return response;

    /*const resp = await fetch(`/api/v2/deck/${id}/deal`, { method: "POST" });
    const response = await resp.json();
    return response;*/
  }
}
