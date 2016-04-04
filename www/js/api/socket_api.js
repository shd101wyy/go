if (!window.socket) {
  window.socket = io()
}

let socket = window.socket

let socketAPI = {
  inviteMatch: function(opponentID) {
    socket.emit('invite-match', opponentID)
  }
}


socket.on('generate-user-id', function(userID) {
  console.log('get userID: ', userID)
  $('.user-id').html('User ID: ' + userID)
})

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
})

module.exports = socketAPI
