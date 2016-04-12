let Simple = require('./simple.js')

class BoardMenu extends Simple{
  constructor(board) {
    super()
    this.board = board
  }

  render() {

    let $menu = $(`
<div class="board-menu">
  <div class="players">
    <div class="player">
      <div class="card black">
        <div class="profile-image"> </div>
        <p class="name"> ${this.board.playerColor === 'black' ? this.board.playerID : this.board.opponentID} </p>

        ${this.board.playerColor === 'black' ?
          (this.board.isMyTurn() ?
          ` <div class="button-group">
              <div class="pass"> <div class="btn pass-btn"> Pass </div> </div>
              <div class="resign"> <div class="btn resign-btn"> Resign </div> </div>
            </div>` : '<div class="button-group"> White to move</div>')
         : ''}

      </div>
    </div>
    <div class="player">
      <div class="card white">
        <div class="profile-image"> </div>
        <p class="name"> ${this.board.playerColor === 'white' ? this.board.playerID : this.board.opponentID} </p>

        ${this.board.playerColor === 'white' ?
          (this.board.isMyTurn() ?
          ` <div class="button-group">
              <div class="pass"> <div class="btn pass-btn"> Pass </div> </div>
              <div class="resign"> <div class="btn resign-btn"> Resign </div> </div>
            </div>` : '<div class="button-group"> Black to move </div>')
         : ''}
      </div>
    </div>
  </div>
</div>
`)
    console.log('enter here')

    $('.pass-btn', $menu).click(()=>{
      this.board.pass()
    })

    $('.resign-btn', $menu).click(()=>{
      this.board.resign()
    })
    
    return $menu
  }
}

module.exports = BoardMenu
