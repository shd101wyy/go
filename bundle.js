(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./grid.js":2}],2:[function(require,module,exports){
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
      let stone = $(`<div class="stone ${this.board.turn % 2 === 0 ? 'black' : 'white'}" style='width: ${stoneWidth}px; height: ${stoneWidth}px; border-radius: ${stoneWidth}px; left:${-stoneWidth/2}px; top:${-stoneWidth/2}px; background-image: url("${this.getStoneImage()}")'> </div>`)

      this.$grid.append(stone)
      this.board.turn += 1
    })
  }

  getStoneImage() {
    if (this.board.turn % 2 === 0) {
      return './images/b.png'
    } else {
      return `./images/w${Math.floor(Math.random() * 15)}.png`
    }
  }

}

module.exports = {
  Grid
}

},{}],3:[function(require,module,exports){
'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js').Board

let board = new Board(9)
board.render($('.game'))

},{"./board.js":1,"./stone.js":4}],4:[function(require,module,exports){
'use strict'

class Stone {
    constructor() {

    }

    toString() {
      return 'Stone(x. y)'
    }
}

module.exports = {
  Stone
}

},{}]},{},[3]);
