// wait a number of seconds
export function delay(seconds) {
  return new Promise((res, rej) => {
    setTimeout(res, seconds * 1000.0)
  })
}

// get linear value between min and max
export function lerp(min, max, t) {
  return min + (max - min) * t;
}

// a namespace for random fns
export const rand = {
  // get random value between min and max
  range(min, max) {
    return lerp(min, max, Math.random())
  },

  // get a random boolean
  bool() {
    return Math.random() > 0.5
  },
}