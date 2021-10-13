import { Store } from "./store.js"
import { Ledger } from "./ledger.js"

// -- constants --
const kIdIntro = "intro"
const kIdLedger = "ledger"
const kIdCount = "ledger-count"
const kIdRate = "ledger-rate"
const kIdTotal = "ledger-total"
const kClassHidden = "is-hidden"

// -- impls --
// the ui
export class Ui {
  // -- deps --
  // the state store
  #store = Store.get()

  // the player's ledger
  #ledger = new Ledger()

  // -- p/nodes
  // the intro element
  $intro = null

  // the ledger element
  $ledger = null

  // the count element
  $count = null

  // the rate element
  $rate = null

  // the total element
  $total = null

  // -- commands --
  // init the game module
  init() {
    const m = this
    const d = document
    const w = window

    // set props
    m.$intro = d.getElementById(kIdIntro)
    m.$ledger = d.getElementById(kIdLedger)
    m.$count = d.getElementById(kIdCount)
    m.$rate = d.getElementById(kIdRate)
    m.$total = d.getElementById(kIdTotal)

    // listen to events
    m.#store.listen(m.render)
  }

  // render the ui
  render = () => {
    const m = this
    const s = m.#store
    const l = m.#ledger

    // show intro
    m.$intro.classList.toggle(kClassHidden, s.started)

    // show ledger
    m.$ledger.classList.toggle(kClassHidden, l.clicks < 3)

    // construct lines
    const lines = [{
      l: `- ${l.clicks}`,
      r: "clicks",
      $el: m.$count,
    }, {
      l: `@ ${l.rate}`,
      r: "¢ / click",
      h: l.clicks < 10,
      $el: m.$rate,
    }, {
      l: `= $${Math.floor(l.total / 100)}.${l.total % 100}`,
      h: l.clicks < 20,
      $el: m.$total,
    }]

    lines.len = Math.max(lines.map((line) => {
      return !line.h && line.l.length
    }))

    lines.fmt = (line) => {
      return [line.l.padEnd(this.len), line.r].join(" ")
    }

    // render ledger lines
    for (const line of lines) {
      line.$el.classList.toggle(kClassHidden, line.h || false)
      line.$el.innerText = lines.fmt(line)
    }
  }
}
