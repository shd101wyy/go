'use strict'

let Stone = require('./stone.js').Stone

class Grid {
  constructor($gridTouch, $grid, board) {
    this.$gridTouch = $gridTouch
    this.$grid = $grid
    this.board = board

    $gridTouch.click(()=> {
      let row = this.$gridTouch.data('row')
      let col = this.$gridTouch.data('col')

      if (this.board.board[row][col])
        return

      // console.log(row + ', ' + col)

      let stoneWidth = Number(this.$grid.css('width').replace('px', ''))
      let $stone = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${stoneWidth}px; height: ${stoneWidth}px; border-radius: ${stoneWidth}px; background-image: url("${this.getStoneImage()}")' data-row=${row} data-col=${col}> </div>`)

      this.board.board[row][col] = new Stone($stone, this.board) // set to Go board

      this.$gridTouch.append($stone)
      this.board.turn += 1

      this.board.checkCapture()
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
