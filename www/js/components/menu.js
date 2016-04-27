import Simple from '../Simple/Simple.js'
import emitter from '../emitters/emitter.js'

let Menu = Simple.Component({
  emitter: emitter,
  getDefaultProps: function() {
    return {playerID: null}
  },
  init: function() {
    /**
     *  MAIN_MENU
     *  SHOW_BOARD_SIZE
     *  SHOW_MATCH_OPTIONS
     */
    this.state = {  page: 'MAIN_MENU',
                    size: null,
                    color: 'black',
                    komi: 5.5,
                    opponentID: ''}
  },

  selectBoardSize: function(size, e) {
    e.stopPropagation()
    e.preventDefault()
    this.state.size = size
    this.setState({page: 'SHOW_MATCH_OPTIONS'})
    // let opponentID = prompt('enter opponent id')
    // this.emit('find-private-match', {opponentID, size})
  },
  selectColor: function(color) {
    this.setState({color})
  },
  showBoardSize: function(e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({page: 'SHOW_BOARD_SIZE'})
  },
  play: function(mode) {
    console.log(mode, this.refs.komi.value)
    let komi = this.refs.komi.value

    if (isNaN(komi) || komi.trim() === '') {
      toastr.warning('komi ' + komi + ' is an invalid number')
      return
    }

    komi = Number(komi)

    let opponentID = this.refs.opponentID.value
    if (!opponentID) {
      toastr.warning('please enter opponent ID')
      return
    }

    this.state.komi = komi
    this.state.opponentID = opponentID

    let size = this.state.size,
        color = this.state.color

    if (color === 'random') {
      if (Math.random() < 0.5) {
        color = 'black'
      } else {
        color = 'white'
      }
    }

    this.emit('find-private-match', {opponentID, size, color, komi})
  },
  render: function() {
    if (this.state.page === 'SHOW_MATCH_OPTIONS') {
      return this.div({class: 'menu'},
                this.div({class: 'pick-opponent'},
                  this.p({class: 'title'}, 'Opponent ID'),
                  this.input({placeholder: 'enter opponent id here', value: this.state.opponentID, ref: 'opponentID', input: ()=> {this.state.opponentID = this.refs.opponentID.value}})),
                this.div({class: 'pick-color'},
                  this.p({class: 'title'}, 'Your Color'),
                  this.div({class: 'color-group'},
                    this.div({class: 'black color ' + (this.state.color === 'black' ? 'selected' : ''), click: this.selectColor.bind(this, 'black')}, this.span('Black')),
                    this.div({class: 'white color ' + (this.state.color === 'white' ? 'selected' : ''), click: this.selectColor.bind(this, 'white')}, this.span('White')),
                    this.div({class: 'random color ' + (this.state.color === 'random' ? 'selected' : ''), click: this.selectColor.bind(this, 'random')}, this.span('Random')))),
                this.div({class: 'pick-komi'},
                  this.p({class: 'title'}, 'Komi'),
                  this.input({value: this.state.komi, ref: 'komi'})),
                this.div({class: 'bottom-button-group'},
                  this.div({class: 'small-btn', click: this.showBoardSize.bind(this)},
                    this.span('back')),
                  this.div({class: 'small-btn play', click: this.play.bind(this, 'private')},
                    this.span('play'))))
    } else if (this.state.page === 'SHOW_BOARD_SIZE') {
       return this.div({class: 'menu'},
                this.p({class: 'menu-title'}, 'Board Size'),
                this.div({class: 'button play', size: '19', click: this.selectBoardSize.bind(this, 19)},
                  this.span({size: '19'}, '19x19')),
                this.div({class: 'button play', size: '13', click: this.selectBoardSize.bind(this, 13)},
                  this.span({size: '13'}, '13x13')),
                this.div({class: 'button play', size: '9', click: this.selectBoardSize.bind(this, 9)},
                  this.span({size: '9'}, '9x9')),
                this.div({class: 'button back', click: ()=> {this.setState({page: 'MAIN_MENU'})}},
                  this.span('Back')))
    } else {// if (this.state.page === 'MAIN_MENU') {
      return this.div({class: 'menu'},
                this.p({class: 'menu-title'}, `Go! ${this.props.playerID}`),
                this.div({class: 'button private-match',
                          click: ()=> {this.setState({page: 'SHOW_BOARD_SIZE'})}},
                  this.span('Private Match')),
                this.div({class: 'button public-match'},
                  this.span('Public Match')),
                this.div({class: 'button'},
                  this.span('Bot Match')))
    }
  }
})

export default Menu
