export default class Pomp {
  constructor (max) {
    this.max = max
  }

  init () {
    this.counter = 0
  }

  up () {
    this.counter++
  }

  isEnd () {
    return this.counter >= this.max
  }

  getCount () {
    return this.counter
  }
}
