let Grid = require('./grid.js').Grid

// 假设只 9x9
class Board {
  // 9x9 13x13 19x19
  constructor(size) {
    this.size = size
    this.board = []
    this.boardDom = []

    this.turn = 0

    // create board data
    for (let i = 0; i < this.size; i++) {
      this.board.push([])
      this.boardDom.push([])

      for (let j = 0; j < this.size; j++) {
        this.board[i].push(null)
        this.boardDom[i].push(null)
      }
    }
  }

  render($element) {
    let boardSize = 576,
        padding = 24,
        gridSize = (boardSize) / (this.size - 1)

    let dom = $(`<div class="board" style="width: ${boardSize}px; height: ${boardSize}px;"></div>`)
    for (let i = 0; i < this.size - 1; i++) {
      let gridRow = $('<div class="grid-row"></div>')
      for (let j = 0; j < this.size - 1; j++) {
        let grid = $(`<div style='width: ${gridSize}px; height: ${gridSize}px;' class="grid"></div>`)

        let gridTouch = $(`<div class="grid-touch" data-row=${i} data-col=${j}> </div>`)
        this.boardDom[i][j] = new Grid(gridTouch, grid, this)
        grid.append(gridTouch)

        if (j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-top" data-row=${i} data-col=${j+1}> </div>`)
          this.boardDom[i][j + 1] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-left-bottom" data-row=${i+1} data-col=${j}> </div>`)
          this.boardDom[i + 1][j] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2 && j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-bottom" data-row=${i+1} data-col=${j+1}> </div>`)
          this.boardDom[i + 1][j + 1] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        gridRow.append(grid)
      }
      dom.append(gridRow)
    }

    $element.append( dom )
  }
}

module.exports = {
  Board
}
