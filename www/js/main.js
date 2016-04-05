'use strict'
let Stone = require('./stone.js').Stone
let Board = require('./board.js')
let socketAPI = require('./api/socket_api.js')
let Menu = require('./menu.js')
let Signup_Login = require('./signup_login.js')

class GameManager {
  constructor() {
    this.signup_login_page = new Signup_Login()
    this.signup_login_page.appendTo($('.game'))

    document.body.addEventListener('touchmove', function(e){ e.preventDefault()})
  }

  startNewMatch(size, playerColor, opponentID) {
    this.board = new Board(size, playerColor, opponentID)
    this.board.render($('.game'))
  }

  showMenu() {
    if (this.signup_login_page) {
      this.signup_login_page.remove()
    }

    // TODO: remove
    /*
    if (this.board) {
    }
    */

    this.menu = new Menu()
    this.menu.render($('.game'))
  }
}

// 没什么卵用的 loading screen
$('.loading-screen .logo').fadeIn(1000, ()=> {
  setTimeout(()=> {
    $('.loading-screen .logo').fadeOut(1000, ()=> {
      $('.loading-screen').remove()
    })
  }, 1600)
})

// let board = new Board(13)
// board.render($('.game'))
window.gameManager = new GameManager()
// gameManager.showMenu()
