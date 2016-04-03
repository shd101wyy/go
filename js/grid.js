'use strict'
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

      let stoneWidth = Number(this.$grid.css('width').replace('px', '')) - 4
      let stone = $(`<div class="stone ${this.board.turn % 2 == 0 ? 'black' : 'white'}" style='width: ${stoneWidth}px; height: ${stoneWidth}px; border-radius: ${stoneWidth}px; left:${-stoneWidth/2}px; top:${-stoneWidth/2}px;'> </div>`)

      this.$grid.append(stone)
      this.board.turn += 1
    })
  }
}

module.exports = {
  Grid
}
