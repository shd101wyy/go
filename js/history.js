'use strict'

class History {
  constructor() {
    this.history = []
  }

  add(board) {
    this.history.push(board)
  }

  pop() {
    this.history.pop()
  }

  get(num) {
    if (num >= 0) {
      return this.history[num]
    } else {
      return this.history[this.history.length - 1 + num]
    }
  }
}

module.exports = {
  History
}
