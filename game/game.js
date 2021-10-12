import { kScript } from "./script.js"

// -- constants --
const kHashStart = "#hahaha"
const kIdGame = "game"
const kIdWelcome = "welcome"
const kIdHoneypot = "t-honeypot"
const kClassHidden = "is-hidden"

// -- props --
// the game element
let $mGame

// the welcome element
let $mWelcome = null

// the honeypot template
let $tHoneypot = null

// -- lifetime --
// init the game module
function Init() {
  const d = document
  const w = window

  // scrub state
  w.location.hash = ""

  // set props
  $mGame = d.getElementById(kIdGame)
  $mWelcome = d.getElementById(kIdWelcome)
  $tHoneypot = d.getElementById(kIdHoneypot)

  // bind events
  w.addEventListener("hashchange", OnHashChange)
}

// -- commands --
// start the game (after clicking the initial link)
async function Start() {
  // hide mWelcome
  $mWelcome.classList.toggle(kClassHidden, true)

  // once hidden, show the first honeypot
  await Delay(5.0)
  SpawnHoneypot()
}

// adds a new honeypot to the dom
function SpawnHoneypot() {
  // clone node
  const $tmpl = $tHoneypot.content.firstElementChild
  const $nRoot = $tmpl.cloneNode(true)
  const $nCaption = $nRoot.querySelector(".Honeypot-caption")

  // set initial pos
  $nRoot.style.left = `${Rand(5, 90)}vw`
  $nRoot.style.top = `${Rand(5, 90)}vh`

  // set caption pos
  const prop = RandBool() ? "left" : "right"
  $nCaption.style[prop] = `${Rand(0, 60)}%`
  $nCaption.style.top = `${Rand(10, 60)}%`

  // add script
  const text = kScript.honeypot.next()
  $nRoot.setAttribute("alt", text)
  $nCaption.innerText = text

  // bind events
  $nRoot.addEventListener("click", ClickHoneypot)

  // show
  $mGame.appendChild($nRoot)
}

// click the honeypot
function ClickHoneypot(evt) {
  const $node = evt.target
  $node.remove()
  SpawnHoneypot()
}

// -- events --
function OnHashChange() {
  const hash = window.location.hash

  switch (hash) {
  case kHashStart:
    Start(); break
  }
}

// -- utils --
// wait a number of seconds
function Delay(seconds) {
  return new Promise((res, rej) => {
    setTimeout(res, seconds * 1000.0)
  })
}

// get random value between min and max
function Rand(min, max) {
  return Lerp(min, max, Math.random())
}

// get a random boolean
function RandBool() {
  return Math.random() > 0.5
}

// get linear value between min and max
function Lerp(min, max, t) {
  return min + (max - min) * t;
}

// -- bootstrap --
Init()