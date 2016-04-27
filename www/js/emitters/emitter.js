import socketAPI from '../api/socket_api.js'
import userAPI from '../api/user_api.js'
import Simple from '../Simple/Simple.js'
import signupLogin from './signup_login.js'

import Board from '../models/board.js'

let emitter = Simple.createEmitter({
  playerID: null,
  opponentID: null,
  board: null,
  chat: {
    messages: [], // {id, message, me}
    component: null
  },

  boardComponent: null,
  matchComponent: null,
  gameComponent: null,
})

emitter.registerId('emitter')

emitter.on(signupLogin)

emitter.on('start-match', function({opponentID, size, color, komi}) {
  this.state.opponentID = opponentID
  this.state.board = new Board({playerID: this.state.playerID, opponentID, size, playerColor: color, komi})

  let gameComponent = this.state.gameComponent
  gameComponent.setProps({page: 'SHOW_MATCH', board: this.state.board})
})

emitter.on('match-register-self', function(data, component) {
  this.state.matchComponent = component
})

emitter.on('board-register-self', function(data, component) {
  this.state.boardComponent = component
})

emitter.on('board-put-stone', function({row, col}, component) {
  let board = this.state.board
  if (!board.isMyTurn()) return
  let res = board.addStone(row, col)

  if (res === true) {
    this.state.matchComponent.setProps({board: board, messages: this.state.chat.messages})
  } else {
    component.setState({'showIcon': res})

    setTimeout(()=> {
      component.setState({'showIcon': false})
    }, 2000)
  }
})

emitter.on('board-receive-move', function({row, col}) {
  let board = this.state.board
  if (row === -1 || col === -1) { // pass
    board.nextTurn(true)
  } else {
    board.addStone(row, col)
  }
  this.state.matchComponent.setProps({board: board, messages: this.state.chat.messages})
})

emitter.on('pass', function() {
  this.state.board.pass()
  this.state.matchComponent.setProps({board: this.state.board, messages: this.state.chat.messages})
})

emitter.on('resign', function() {
  this.state.board.resign()
})

emitter.on('opponent-score', function() {
  this.state.board.score()
})

emitter.on('opponent-resign', function() {
  this.state.board.opponentResign()
})

emitter.on('chat-register-self', function(data, component) {
  this.state.chat.component = component
  this.state.chat.messages = []
})

emitter.on('send-message', function({message}, component) {
  let playerID = this.state.playerID,
      opponentID = this.state.opponentID

  console.log('send message', {playerID, opponentID, message})
  socketAPI.sendMessage({ playerID, opponentID, message })

  let messages = this.state.chat.messages
  messages.push({id: playerID, message: message, me: true})
  component.setProps({playerID, opponentID, messages})
})

emitter.on('receive-message', function({opponentID, message}) {
  let messages = this.state.chat.messages,
      playerID = this.state.playerID

  messages.push({id: opponentID, message: message, me: false})

  if (this.state.chat.component) {
    this.state.chat.component.setProps({playerID, opponentID, messages})
  }
})

emitter.on('find-private-match', function({opponentID, size, color, komi}, component) {
  socketAPI.inviteMatch({opponentID, size, color, komi})
})



export default emitter
