'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js').Board

let board = new Board(9)
board.render($('.game'))