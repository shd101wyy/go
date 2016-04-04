'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js').Board
let socketAPI = require('./api/socket_api.js')
let Menu = require('./menu.js')

// 没什么卵用的 loading screen
$('.loading-screen .logo').fadeIn(1000, ()=> {
  setTimeout(()=> {
    $('.loading-screen .logo').fadeOut(1000, ()=> {
      $('.loading-screen').remove()
    })
  }, 1600)
})

let board = new Board(13)
board.render($('.game'))

// let menu = new Menu()
// menu.render($('.game'))
