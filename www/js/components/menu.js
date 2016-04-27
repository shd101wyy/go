import Simple from '../Simple/Simple.js'
import emitter from '../emitters/emitter.js'

let Menu = Simple.Component({
  emitter: emitter,
  getDefaultProps: function() {
    return {playerID: null}
  },
  init: function() {
    this.state = {showBoardSize: false}
  },
  selectBoardSize: function(size) {
    let opponentID = prompt('enter opponent id')
    this.emit('find-private-match', {opponentID, size})
  },
  render: function() {
    if (this.state.showBoardSize) {
       return this.div({class: 'menu'},
                this.p({class: 'menu-title'}, 'Board Size'),
                this.div({class: 'button play', size: '19', click: this.selectBoardSize.bind(this, 19)},
                  this.span({size: '19'}, '19x19')),
                this.div({class: 'button play', size: '13', click: this.selectBoardSize.bind(this, 13)},
                  this.span({size: '13'}, '13x13')),
                this.div({class: 'button play', size: '9', click: this.selectBoardSize.bind(this, 9)},
                  this.span({size: '9'}, '9x9')),
                this.div({class: 'button back', click: ()=> {this.setState({showBoardSize: false})}},
                  this.span('Back')))
    } else {
      return this.div({class: 'menu'},
                this.p({class: 'menu-title'}, `Go! ${this.props.playerID}`),
                this.div({class: 'button private-match',
                          click: ()=> {this.setState({showBoardSize: true})}},
                  this.span('Private Match')),
                this.div({class: 'button public-match'},
                  this.span('Public Match')),
                this.div({class: 'button'},
                  this.span('Bot Match')))
    }
  }
})

export default Menu
