(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 假设只 9x9
class Board {
  // 9x9 13x13 19x19
  constructor(size) {
    this.size = size
    this.board = []
    this.boardDom = []

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
    // boardSize 560px
    // padding 24px;
    // gridSize (boardSize - padding * 2) / 8
    let boardSize = 512,
        padding = 24,
        gridSize = (boardSize) / (this.size - 1)

    let dom = $(`<div class="board" style="width: ${boardSize}px; height: ${boardSize}px; padding: ${padding}px;"></div>`)
    for (let i = 0; i < this.size - 1; i++) {
      let gridRow = $('<div class="grid-row"></div>')
      for (let j = 0; j < this.size - 1; j++) {
        let gridTouch = $(`<div class="grid-touch" row=${i} col=${j}> </div>`)
        this.boardDom[i][j] = gridTouch

        let grid = $(`<div style='width: ${gridSize}px; height: ${gridSize}px;' class="grid"></div>`)
        grid.append(gridTouch)

        if (j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch-right-top" row=${i} col=${j+1}> </div>`)
          this.boardDom[i][j + 1] = gridTouch
          grid.append(gridTouch)
        }

        if (i === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch-left-bottom" row=${i+1} col=${j}> </div>`)
          this.boardDom[i + 1][j] = gridTouch
          grid.append(gridTouch)
        }

        if (i === this.size - 2 && j === this.size - 2) {
          let gridTouch = $(`<div class="grid-touch-right-bottom" row=${i+1} col=${j+1}> </div>`)
          this.boardDom[i + 1][j + 1] = gridTouch
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

},{}],2:[function(require,module,exports){
'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js').Board

let board = new Board(9)
board.render($('.game'))

},{"./board.js":1,"./stone.js":3}],3:[function(require,module,exports){
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

},{}]},{},[2]);
