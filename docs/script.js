// -- impls --
// a sequence of lines
class ScriptSequence {
  // -- props --
  // the index in the list
  i = 0

  // the list of lines
  lines = null

  // -- lifetime --
  // create a new sequence
  constructor(...lines) {
    this.i = 0
    this.lines = lines
  }

  // -- operators --
  // get the next line
  next() {
    const m = this
    const line = m.lines[m.i]
    m.i = Math.min(m.i + 1, m.lines.length - 1)
    return line
  }
}

// -- content --
export const kScript = {
  honeypot: new ScriptSequence(
    "please click this"
  )
}
