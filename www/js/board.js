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

    this.$mark = null

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

  getStoneImage() {
    if (this.turn % 2 === 0) {
      return './images/b.png'
    } else {
      return `./images/w${Math.floor(Math.random() * 15 + 1)}.png`
    }
  }

  addStone(row, col) {
    if (this.board[row][col]) return

    let $stone = $(`<div class="stone ${this.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${this.stoneSize}px; height: ${this.stoneSize}px; border-radius: ${this.stoneSize}px; background-image: url("${this.getStoneImage()}");' data-row=${row} data-col=${col} id="stone-${row}-${col}"> </div>`)

    $(`#grid-touch-${row}-${col}`).append($stone)

    let stone = new Stone($stone, this)

    this.board[row][col] = stone // set to Go board

    this.turn += 1

    // console.log('enter here')

    this.checkCapture(row, col)
  }

  removeStone(row, col) {
    if (this.board[row][col]) {
      this.board[row][col].$stone.remove()
      this.board[row][col] = null
    }
  }

  // check if two boards have the same.
  twoBoardsEqual(board) {
    let board1 = this.board
    let board2 = board

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let stone1 = board1[i][j]
        let stone2 = board2[i][j]

        if (!stone1 && !stone2) {
          continue
        } else if (stone1 && stone2 && stone1.color === stone2.color) {
          continue
        } else {
          return false
        }
      }
    }
    return true
  }

  showIcon(row, col, iconName) {
    let $gridTouch = this.boardDom[row][col].$gridTouch
    let $icon = $(`<div class='${iconName}'> </div>`)
    $icon.css('width', $gridTouch.css('width'))
    $icon.css('height', $gridTouch.css('height'))
    $icon.css('left', $gridTouch.css('left'))
    $icon.css('right', $gridTouch.css('right'))
    $icon.css('top', $gridTouch.css('top'))
    $icon.css('bottom', $gridTouch.css('bottom'))


    this.boardDom[row][col].$grid.append($icon)

    $icon.fadeOut(2000, ()=> {
      $icon.remove()
    })
  }

  setMark(row, col) {
    if (this.$mark) {
      this.$mark.remove()
    }

    let $grid = this.boardDom[row][col].$grid
    let $gridTouch = this.boardDom[row][col].$gridTouch
    let $mark = $(`<div class="${this.board[row][col].color === 'black' ? 'mark-w':'mark-b'}"></div>`)
    $mark.css('width', $grid.css('width'))
    $mark.css('height', $grid.css('height'))
    $mark.css('left', $gridTouch.css('left'))
    $mark.css('right', $gridTouch.css('right'))
    $mark.css('top', $gridTouch.css('top'))
    $mark.css('bottom', $gridTouch.css('bottom'))

    this.$mark = $mark
    this.boardDom[row][col].$grid.append(this.$mark)

    if (this.$mark) {
      this.$mark.remove()
    } else {
      let $gridTouch = this.boardDom[row][col].$gridTouch
      let $mark = $(`<div class='mark'> </div>`)
      $mark.css('width', $gridTouch.css('width'))
      $mark.css('height', $gridTouch.css('height'))
      $mark.css('left', $gridTouch.css('left'))
      $mark.css('right', $gridTouch.css('right'))
      $mark.css('top', $gridTouch.css('top'))
      $mark.css('bottom', $gridTouch.css('bottom'))

      this.$mark = $mark
    }

    this.boardDom[row][col].$grid.append(this.$mark)
  }

  checkCapture(row, col) {
    let color = (this.turn % 2 === 0) ? 'black' : 'white'
    let last = this.history.get(-1)

    // check opponent
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let stone = this.board[i][j]
        if (stone && !stone.checked && stone.sameColor(color)) {
          // console.log('@ check ' + i + ' ' + j)
          if (stone.hasNoQi()) {
            this.board[i][j] = null  // not remove dom yet
            if (this.twoBoardsEqual(last)) {
              console.log('打劫！')
              this.showIcon(row, col, 'jie')
              this.board[i][j] = stone // restore
              this.removeStone(row, col)
              this.turn -= 1
              this.markAllStonsUncheckd()
              return
            } else {
              this.board[i][j] = stone // restore. Have to restore first.
              stone.removeStones()
            }
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
            this.showIcon(row, col, 'suicide')
            this.removeStone(row, col) // restore
            this.turn -= 1
            this.markAllStonsUncheckd()
            return
          }
        }
      }
    }

    this.markAllStonsUncheckd()
    this.history.add(this.board) // save to history
    // this.setMark(row, col) // mark lastest stone
    this.setMark(row, col)
  }

  render($element) {
    let boardSize = 576,
        padding = 24,
        gridSize = (boardSize) / (this.size - 1)

    let dom = $(`<div class="board" style="width: ${boardSize}px; height: ${boardSize}px;"></div>`)
    let stoneSize = gridSize
    this.stoneSize = gridSize

    for (let i = 0; i < this.size - 1; i++) {
      let gridRow = $('<div class="grid-row"></div>')
      for (let j = 0; j < this.size - 1; j++) {
        let grid = $(`<div style='width: ${gridSize}px; height: ${gridSize}px;' class="grid"></div>`)

        let gridTouch = $(`<div class="grid-touch"
                                data-row=${i}
                                data-col=${j}
                                id="grid-touch-${i}-${j}"
                                style="width: ${stoneSize}px; height: ${stoneSize}px; left: ${-stoneSize/2}px; top: ${-stoneSize/2}px;"> </div>`)
        this.boardDom[i][j] = new Grid(gridTouch, grid, this)
        grid.append(gridTouch)

        if (j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-top"
                                  data-row=${i}
                                  data-col=${j+1}
                                  id="grid-touch-${i}-${j+1}"
                                  style="width: ${stoneSize}px; height: ${stoneSize}px; right: ${-stoneSize/2}px; top: ${-stoneSize/2}px;"> </div>`)
          this.boardDom[i][j + 1] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-left-bottom"
                                  data-row=${i+1}
                                  data-col=${j}
                                  id="grid-touch-${i+1}-${j}"
                                  style="width: ${stoneSize}px; height: ${stoneSize}px; left: ${-stoneSize/2}px; bottom: ${-stoneSize/2}px;"> </div>`)
          this.boardDom[i + 1][j] = new Grid(gridTouch, grid, this)
          grid.append(gridTouch)
        }

        if (i === this.size - 2 && j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch grid-touch-right-bottom"
                                  data-row=${i+1}
                                  data-col=${j+1}
                                  id="grid-touch-${i+1}-${j+1}"
                                  style="width: ${stoneSize}px; height: ${stoneSize}px; right: ${-stoneSize/2}px; bottom: ${-stoneSize/2}px;"> </div>`)
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
