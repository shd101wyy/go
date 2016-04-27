'use strict'

import Simple from '../Simple/Simple.js'

if (!window.socket) {
  window.socket = io()
}

let socket = window.socket

let socketAPI = {
  inviteMatch: function(opponentID, size) {
    socket.emit('invite-match', opponentID, size)
  },

  sendMove: function(opponentID, row, col) {
    socket.emit('send-move', [opponentID, row, col])
  },

  userLoggedIn: function(userID) {
    socket.emit('user-logged-in', userID)
  },

  resign: function(userID, opponentID) {
    socket.emit('resign', userID, opponentID)
  },

  score: function(userID, opponentID) {
    socket.emit('score', userID, opponentID)
  },

  sendMessage: function({playerID, opponentID, message}) {
    socket.emit('send-message', playerID, opponentID, message)
  }
}

socket.on('opponent-not-found', function(opponentID) {
  alert('opponent ' + opponentID + ' not found')
})

socket.on('invitation-sent', function(opponentID) {
  alert('opponent ' + opponentID + ' not found')
})

socket.on('receive-match-invitation', function(opponentID) {
  alert('receive match invitation from ' + opponentID)
})

socket.on('start-match', function(data) {
  let size = data.size,
      color = data.color,
      opponentID = data.opponentID

  Simple.Emitter.getEmitterById('emitter').emit('start-match', {opponentID, size, color})
})

socket.on('receive-move', function(data) {
  let row = data[0],
      col = data[1]

  Simple.Emitter.getEmitterById('emitter').emit('board-receive-move', {row, col})
})

socket.on('opponent-resign', function() {
  Simple.Emitter.getEmitterById('emitter').emit('opponent-resign')
})

socket.on('opponent-score', function() {
  Simple.Emitter.getEmitterById('emitter').emit('opponent-score')
})

socket.on('opponent-disconnect', function(opponentID) {
  alert('opponent disconnect: ' + opponentID)
})

socket.on('receive-message', function(opponentID, message) {
  console.log('receive message')
  Simple.Emitter.getEmitterById('emitter').emit('receive-message', {opponentID, message})
})

export default socketAPI
