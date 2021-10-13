// -- constants --
const kStoreKey = "store"
const kStoreChangeEvent = "store-change"

// -- impls --
// a state store
export class Store {
  // -- module --
  static #shared = null

  // get the shared ledger
  static get() {
    const m = this
    if (m.#shared == null) {
      m.#shared = new Store()
    }

    return m.#shared
  }

  // -- deps --
  // the underlying storage location
  #storage = localStorage

  // -- props --
  // if the game has started
  started = false

  // the number of clicks
  clicks = 0

  // -- lifetime --
  // inits the state from storage
  constructor() {
    this.load()
  }

  // -- commands --
  // mutates the state w/ a function
  set(mutate) {
    mutate(this)
    document.dispatchEvent(new Event(kStoreChangeEvent))
  }

  // listen to state changes
  listen(action) {
    document.addEventListener(kStoreChangeEvent, action)
  }

  // -- c/serialization
  // load props from storage
  load() {
    const m = this

    // read from storage
    const json = m.#storage.getItem(kStoreKey)
    if (json == null) {
      return
    }

    // parse json
    const data = JSON.parse(json)

    // set props
    m.clicks = data.clicks
  }

  // save props to storage
  save() {
    const m = this

    // serialize ledger
    const json = JSON.stringify({
      clicks: m.clicks,
    })

    // write to store
    m.#storage.setItem(kStoreKey, json)
  }
}