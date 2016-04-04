'use strict'
let socketAPI = require('./api/socket_api.js')

class Menu {
  constructor() {

  }

  render($element) {
    let $menu = $('<div class="menu"> </div>'),
        $privateMatchBtn = $('<div class="button"> <span> Private Match </span> </div>')

    $privateMatchBtn.click(()=> {
      let opponentID = prompt('enter opponent id')
      socketAPI.inviteMatch(opponentID)
    })

    $menu.append($privateMatchBtn)

    $element.append($menu)
  }
}

module.exports = Menu
