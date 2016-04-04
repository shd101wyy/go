(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  checkCapture() {
    let color = (this.turn % 2 === 0) ? 'black' : 'white'
    let currentBoard = this.board
    let last = this.history.get(-1)

    // check opponent
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let stone = this.board[i][j]
        if (stone && !stone.checked && stone.sameColor(color)) {
          if (stone.hasNoQi()) {
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
          if (stone.hasNoQi()) {
            // suicide
            // TODO: hint user not to put stone this way
            stone.removeStones()
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

},{"./grid.js":2,"./history.js":3,"./stone.js":5}],2:[function(require,module,exports){
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

},{"./stone.js":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js').Board

let board = new Board(9)
board.render($('.game'))

},{"./board.js":1,"./stone.js":5}],5:[function(require,module,exports){
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

},{}]},{},[4]);
