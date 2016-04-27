'use strict'

import Simple from './Simple/Simple.js'
import Game from './components/game.js'
import Menu from './components/menu.js'
/*
class GameManager {
  constructor() {
    this.$game = $('.game')
    userAPI.checkAuth((res)=> {
      if (res && res.success) {
        this.playerID = res.userID
        // $('.user-id').html('User ID: ' + this.playerID)
        socketAPI.userLoggedIn(this.playerID)
        this.showMenu()
      } else {
        this.signup_login_page = new Signup_Login()
        this.signup_login_page.appendTo($('.game'))
      }
    })

    document.body.addEventListener('touchmove', function(e){ e.preventDefault()})

    // this.startNewMatch(19, 'white', 'opponentID')
  }

  setPlayerID(id) {
    this.playerID = id
  }

  startNewMatch(size, playerColor, opponentID) {
    this.board = new Board({  size,
                              playerColor,
                              playerID: this.playerID,
                              opponentID,
                              gameManager: this})
    this.board.render(this.$game)
    // this.board.appendTo(this.$game)

    this.boardMenu = new BoardMenu(this.board)
    this.boardMenu.appendTo(this.$game)
  }

  updateBoardMenu() {
    this.boardMenu.forceUpdate()
  }

  showMenu() {
    if (this.signup_login_page) {
      this.signup_login_page.remove()
      this.signup_login_page = null
    }

    if (this.board) {
      this.board.remove()
      this.board = null
    }

    if (this.boardMenu) {
      this.boardMenu.remove()
      this.boardMenu = null
    }

    // TODO: remove board

    this.menu = new Menu(this)
    this.menu.appendTo($('.game'))
  }
}

*/

// 没什么卵用的 loading screen
/**
$('.loading-screen .logo').fadeIn(1000, ()=> {
  setTimeout(()=> {
    $('.loading-screen .logo').fadeOut(1000, ()=> {
      $('.loading-screen').remove()
    })
  }, 1600)
})
*/
$('.loading-screen').remove()


// window.gameManager = new GameManager()
// let board = new Board({size: 9})
//board.board[1][1] = {color: 'black'}
// board.score()

let game = Game()
Simple.render(Game(), document.getElementById('game'))

// let emitter = game.emitter
// emitter.emit('start-match', {opponentID: 'shd101wyy2', size: 9, color: 'black'})
