'use strict'
let socketAPI = require('./api/socket_api.js')
let Simple = require('./simple.js')

class Menu extends Simple {
  constructor() {
    super()

    this.state = {
      showBoardSize: false
    }
  }

  render() {
    if (this.state.showBoardSize) {
      let $menu = $( `<div class="menu">
                      <p class="menu-title"> Board Size </p>
                      <div class="button" size="19"> <span size="19"> 19x19 </span> </div>
                      <div class="button" size="13"> <span size="13"> 13x13 </span> </div>
                      <div class="button" size="9"> <span size="9"> 9x9 </span> </div>
                    </div>`)

      $('.button', $menu).click((event)=> {
        let size = parseInt(event.target.getAttribute('size'))

        let opponentID = prompt('enter opponent id')
        socketAPI.inviteMatch(opponentID, size)
      })

      return $menu
    } else {
      let $menu = $(` <div class="menu">
                        <div class="button private-match"> <span> Private Match </span> </div>
                        <div class="button public-match"> <span> Public Match </span> </div>
                      </div>`)

      $('.private-match', $menu).click(()=> {
        this.setState({showBoardSize: true})
      })

      $('.public-match', $menu).click(()=> {
        console.log('public match')
      })

      return $menu
    }
  }
}

module.exports = Menu
