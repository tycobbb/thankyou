// -- types --
// a line sequence
class Sequence {
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

// -- script --
export const kScript = {
  honeypot: new Sequence(
    "please click this"
  )
}
