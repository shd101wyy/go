'use strict'

import Simple from './Simple/Simple.js'
import Game from './components/game.js'
import Menu from './components/menu.js'

// loading screen
$('.loading-screen .logo').fadeIn(1000, ()=> {
  setTimeout(()=> {
    $('.loading-screen .logo').fadeOut(1000, ()=> {
      $('.loading-screen').remove()
    })
  }, 1600)
})

let game = Game()
Simple.render(Game(), document.getElementById('game'))
