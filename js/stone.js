'use strict'

class Stone {
    constructor($stone, board) {
      this.$stone = $stone
      this.board = board
      this.row = $stone.data('row')
      this.col = $stone.data('col')
      this.checked = false
      this.color = $stone.hasClass('black') ? 'black' : 'white'
    }

    toString() {
      return `Stone(${this.row}, ${this.col})`
    }

    sameColor(color) {
      return this.color === color
    }

    // check self and nearby stones qi
    hasNoQi() {
      this.checked = true
      let hasNoQi = true
      if (this.getQi() > 0) {
        hasNoQi = false
      }

      let top = this.getTopStone(),
          left = this.getLeftStone(),
          right = this.getRightStone(),
          bottom = this.getBottomStone()

      if (top && top.sameColor(this.color) && !top.checked && !top.hasNoQi()) {
        hasNoQi = false
      }

      if (left && left.sameColor(this.color) && !left.checked && !left.hasNoQi()) {
        hasNoQi = false
      }

      if (right && right.sameColor(this.color) && !right.checked && !right.hasNoQi()) {
        hasNoQi = false
      }

      if (bottom && bottom.sameColor(this.color) && !bottom.checked && !bottom.hasNoQi()) {
        hasNoQi = false
      }

      return hasNoQi

    }

    getTopStone() {
      if (this.row !== 0) {
        return this.board.board[this.row - 1][this.col]
      } else {
        return null
      }
    }

    getBottomStone() {
      if (this.row !== this.size - 1) {
        return this.board.board[this.row + 1][this.col]
      } else {
        return null
      }
    }

    getLeftStone() {
      if (this.col !== 0) {
        return this.board.board[this.row][this.col - 1]
      } else {
        return null
      }
    }

    getRightStone() {
      if (this.col !== this.size - 1) {
        return this.board.board[this.row][this.col + 1]
      } else {
        return null
      }
    }

    getQi() {
      let qi = 0

      // check top
      if (this.row > 0) {
        if (!this.board.board[this.row-1][this.col]) {
          qi += 1
        }
      }

      // check left
      if (this.col > 0) {
        if (!this.board.board[this.row][this.col - 1]) {
          qi += 1
        }
      }

      // check right
      if (this.col < this.board.size - 1) {
        if (!this.board.board[this.row][this.col + 1]) {
          qi += 1
        }
      }

      // check bottom
      if (this.row < this.board.size - 1) {
        if (!this.board.board[this.row + 1][this.col]) {
          qi += 1
        }
      }

      console.log(this.row + ' ' + this.col + ': ' + qi)

      return qi
    }

    removeStones() {
      this.$stone.remove()
      this.board.board[this.row][this.col] = null
      this.board.boardDom[this.row][this.col] = null

      let top = this.getTopStone(),
          left = this.getLeftStone(),
          right = this.getRightStone(),
          bottom = this.getBottomStone()

      if (top && top.sameColor(this.color)) {
        top.removeStones()
      }

      if (left && left.sameColor(this.color)) {
        left.removeStones()
      }

      if (right && right.sameColor(this.color)) {
        right.removeStones()
      }

      if (bottom && bottom.sameColor(this.color)) {
        bottom.removeStones()
      }

    }
}

module.exports = {
  Stone: Stone
}
