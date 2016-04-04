let Grid = require('./grid.js').Grid
let Stone = require('./stone.js').Stone
let History = require('./history.js').History

// 假设只 9x9
class Board {
  // 9x9 13x13 19x19
  constructor(size) {
    this.size = size
    this.board = []
    this.boardDom = []

    this.turn = 0
    this.history = new History()

    // create board data
    for (let i = 0; i < this.size; i++) {
      this.board.push([])
      this.boardDom.push([])

      for (let j = 0; j < this.size; j++) {
        this.board[i].push(null)
        this.boardDom[i].push(null)
      }
    }

    this.history.add(this.board)
  }

  // mark all stones as unchecked
  markAllStonsUncheckd() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j]) {
          this.board[i][j].checked = false
        }
      }
    }
  }

  removeStone(i, j) {
    if (this.board[i][j]) {
      this.board[i][j].$stone.remove()
      this.board[i][j] = null
    }
  }

  checkCapture() {
    let color = (this.turn % 2 === 0) ? 'black' : 'white'
    let currentBoard = this.board
    let last = this.history.get(-1)

    // check opponent
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let stone = this.board[i][j]
        if (stone && !stone.checked && stone.sameColor(color)) {
          // console.log('@ check ' + i + ' ' + j)
          if (stone.hasNoQi()) {
            // console.log('@ no qi ' + i + ' ' + j)
            stone.removeStones()
          }
        }
      }
    }

    // check self
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let stone = this.board[i][j]
        if (stone && !stone.checked) {
          // console.log('@@ check ' + i + ' ' + j)
          if (stone.hasNoQi()) {
            // suicide
            // TODO: hint user not to put stone this way
            // console.log('@@ no qi ' + i + ' ' + j)
            console.log('suicide')
            let $gridTouch = this.boardDom[i][j].$gridTouch
            let $suicide = $(`<div class='suicide'> </div>`)
            $suicide.css('width', $gridTouch.css('width'))
            $suicide.css('height', $gridTouch.css('height'))
            $suicide.css('left', $gridTouch.css('left'))
            $suicide.css('right', $gridTouch.css('right'))
            $suicide.css('top', $gridTouch.css('top'))
            $suicide.css('bottom', $gridTouch.css('bottom'))


            this.boardDom[i][j].$grid.append($suicide)

            $suicide.fadeOut(2000, ()=> {
              $suicide.remove()
            })

            this.removeStone(i, j) // restore
            this.turn -= 1
            return
            // stone.removeStones()
          }
        }
      }
    }

    this.markAllStonsUncheckd()
  }

  render($element) {
    let boardSize = 576,
        padding = 24,
        gridSize = (boardSize) / (this.size - 1)

    let dom = $(`<div class="board" style="width: ${boardSize}px; height: ${boardSize}px;"></div>`)
    let stoneWidth = gridSize - 4

    for (let i = 0; i < this.size - 1; i++) {
      let gridRow = $('<div class="grid-row"></div>')
      for (let j = 0; j < this.size - 1; j++) {
        let grid = $(`<div style='width: ${gridSize}px; height: ${gridSize}px;' class="grid"></div>`)

        let gridTouch = $(`<div class="grid-touch"
                                data-row=${i}
                                data-col=${j}
                                style="width: ${stoneWidth}px; height: ${stoneWidth}px; left: ${-stoneWidth/2}px; top: ${-stoneWidth/2}px;"> </div>`)
        this.boardDom[i][j] = new Grid(gridTouch, grid, this)
        grid.append(gridTouch)

        if (j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-top"
                                  data-row=${i}
                                  data-col=${j+1}
                                  style="width: ${stoneWidth}px; height: ${stoneWidth}px; right: ${-stoneWidth/2}px; top: ${-stoneWidth/2}px;"> </div>`)
          this.boardDom[i][j + 1] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-left-bottom"
                                  data-row=${i+1}
                                  data-col=${j}
                                  style="width: ${stoneWidth}px; height: ${stoneWidth}px; left: ${-stoneWidth/2}px; bottom: ${-stoneWidth/2}px;"> </div>`)
          this.boardDom[i + 1][j] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2 && j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-bottom"
                                  data-row=${i+1}
                                  data-col=${j+1}
                                  style="width: ${stoneWidth}px; height: ${stoneWidth}px; right: ${-stoneWidth/2}px; bottom: ${-stoneWidth/2}px;"> </div>`)
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
