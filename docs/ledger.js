import { Store } from "./store.js"

// a ledger tracking the player's debts
export class Ledger {
  // -- deps --
  // the state store
  #store = Store.get()

  // -- commands --
  // records a click into the ledger
  recordClick() {
    this.#store.set((s) => s.clicks++)
  }

  // -- queries --
  // how many times the player has clicked
  get clicks() {
    return this.#store.clicks
  }

  // how expensive each click is
  get rate() {
    return 10
  }

  // the player's total debts
  get total() {
    return this.rate * this.clicks
  }
}