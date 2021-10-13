import { delay, rand } from "./utils.js"
import { Ui } from "./ui.js"
import { kScript } from "./script.js"
import { Store } from "./store.js"
import { Ledger } from "./ledger.js"

// -- constants --
const kHashStart = "#hahaha"
const kIdGame = "game"
const kIdHoneypot = "t-honeypot"

// -- impls --
class Game {
  // -- deps --
  // the state store
  #store = Store.get()

  // the player's ledger
  #ledger = new Ledger()

  // -- props --
  // the game element
  $root = null

  // the honeypot template
  $honeypot = null

  // -- commands --
  // run the game
  static run() {
    new Game().init()
    new Ui().init()
  }

  // init the game module
  init() {
    const m = this
    const d = document
    const w = window

    // scrub state
    if (w.location.hash) {
      w.location.hash = ""
    }

    // set props
    m.$root = d.getElementById(kIdGame)
    m.$honeypot = d.getElementById(kIdHoneypot)

    // bind events
    w.addEventListener("hashchange", m.onHashChange)
  }

  // start the game (after clicking the initial link)
  async start() {
    const m = this

    // start the game
    m.#store.set((s) => s.started = true)

    // wait for the animation fo finish
    // show the first honeypot
    await delay(5.0)
    m.spawnHoneypot()
  }

  // adds a new honeypot to the dom
  spawnHoneypot() {
    const m = this

    // clone node
    const $tmpl = m.$honeypot.content.firstElementChild
    const $root = $tmpl.cloneNode(true)
    const $text = $root.querySelector(".Honeypot-caption")

    // set initial pos
    $root.style.left = `${rand.range(5, 90)}vw`
    $root.style.top = `${rand.range(5, 90)}vh`

    // set caption pos
    const prop = rand.bool() ? "left" : "right"
    $text.style[prop] = `${rand.range(0, 60)}%`
    $text.style.top = `${rand.range(-5, 95)}%`

    // add script
    const text = kScript.honeypot.next()
    $root.setAttribute("alt", text)
    $text.innerText = text

    // bind events
    $root.addEventListener("click", m.onClickHoneypot)

    // show
    m.$root.appendChild($root)
  }

  // destroy the honeypot and add a new one
  selectHoneypot($node) {
    const m = this

    // destroy the node
    $node.remove()

    // spawn a new one
    m.spawnHoneypot()

    // record the click
    m.#ledger.recordClick()
  }

  // -- events --
  // when navigating to a hash url
  onHashChange = () => {
    switch (window.location.hash) {
    case kHashStart:
      this.start(); break
    }
  }

  // when clicking a honeypot
  onClickHoneypot = (evt) => {
    this.selectHoneypot(evt.target)
  }
}

// -- bootstrap --
Game.run()
