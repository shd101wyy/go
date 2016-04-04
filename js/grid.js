'use strict'

let Stone = require('./stone.js').Stone

class Grid {
  constructor($gridTouch, $grid, board) {
    this.$gridTouch = $gridTouch
    this.$grid = $grid
    this.board = board
    this.stoneSize = Number(this.$grid.css('width').replace('px', ''))

    this.$hoverElement = null

    this.row = this.$gridTouch.data('row')
    this.col = this.$gridTouch.data('col')

    this.addDot()

    $gridTouch.click(()=> {
      if (this.board.board[this.row][this.col])
        return

      let $stone = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${this.stoneSize}px; height: ${this.stoneSize}px; border-radius: ${this.stoneSize}px; background-image: url("${this.getStoneImage()}");' data-row=${this.row} data-col=${this.col}> </div>`)

      this.board.board[this.row][this.col] = new Stone($stone, this.board) // set to Go board

      this.$gridTouch.append($stone)
      this.board.turn += 1

      this.board.checkCapture(this.row, this.col)
    })

    $gridTouch.hover(
      () => {
        if (this.$hoverElement || this.board.board[this.row][this.col]) return
        else {
          this.$hoverElement = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${this.stoneSize}px; height: ${this.stoneSize}px; border-radius: ${this.stoneSize}px; background-image: url("${this.getStoneImage()}"); opacity: 0.5;' data-row=${this.row} data-col=${this.col}> </div>`)

          this.$gridTouch.append(this.$hoverElement)
        }
      },
      () => {
        if (this.$hoverElement) {
          this.$hoverElement.remove()
          this.$hoverElement = null
        }
      })
  }

  getStoneImage() {
    if (this.board.turn % 2 === 0) {
      return './images/b.png'
    } else {
      return `./images/w${Math.floor(Math.random() * 15 + 1)}.png`
    }
  }

  addDot() {
    if (this.board.size === 9) {
      if ((this.row === 2 || this.row === 6) && (this.col === 2 || this.col === 6) || (this.row === 4 && this.col === 4)) {
        this.$gridTouch.append($('<div class="dot"></div>'))
      }
    }

    if (this.board.size === 13) {
      if ((this.row === 3 || this.row === 9) && (this.col === 3 || this.col === 9) || (this.row === 6 && this.col === 6)) {
        console.log('here')
        this.$gridTouch.append($('<div class="dot"></div>'))
      }
    }

    if (this.board.size === 19) {
      if ((this.row === 3 || this.row === 9 || this.row === 15) && (this.col === 3 || this.col === 9 || this.col === 15) || (this.row === 9 && this.col === 9)) {
        console.log('here')
        this.$gridTouch.append($('<div class="dot dot-19"></div>'))
      }
    }
  }

}

module.exports = {
  Grid
}
