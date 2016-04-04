'use strict'

let Stone = require('./stone.js').Stone

class Grid {
  constructor($gridTouch, $grid, board) {
    this.$gridTouch = $gridTouch
    this.$grid = $grid
    this.board = board
    this.stoneSize = Number(this.$grid.css('width').replace('px', ''))

    this.$hoverElement = null

    $gridTouch.click(()=> {
      let row = this.$gridTouch.data('row')
      let col = this.$gridTouch.data('col')

      if (this.board.board[row][col])
        return

      let $stone = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${this.stoneSize}px; height: ${this.stoneSize}px; border-radius: ${this.stoneSize}px; background-image: url("${this.getStoneImage()}");' data-row=${row} data-col=${col}> </div>`)

      this.board.board[row][col] = new Stone($stone, this.board) // set to Go board

      this.$gridTouch.append($stone)
      this.board.turn += 1

      this.board.checkCapture(row, col)
    })

    $gridTouch.hover(
      () => {
        let row = this.$gridTouch.data('row')
        let col = this.$gridTouch.data('col')

        if (this.$hoverElement || this.board.board[row][col]) return
        else {
          this.$hoverElement = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${this.stoneSize}px; height: ${this.stoneSize}px; border-radius: ${this.stoneSize}px; background-image: url("${this.getStoneImage()}"); opacity: 0.5;' data-row=${row} data-col=${col}> </div>`)

          this.$gridTouch.append(this.$hoverElement)
        }
      },
      () => {
        let row = this.$gridTouch.data('row')
        let col = this.$gridTouch.data('col')

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

}

module.exports = {
  Grid
}
