import socketAPI from '../api/socket_api.js'
import userAPI from '../api/user_api.js'

let signupLogin = {
  'check-auth': function(data, component) {
    console.log('check auth')
    this.state.gameComponent = component
    userAPI.checkAuth((res)=> {
      if (res && res.success) {
        this.state.playerID = res.userID
        socketAPI.userLoggedIn(this.state.playerID)
        component.setProps({page: 'SHOW_MENU', playerID: this.state.playerID})
      }
    })
  },

  'login': function({email, password}, component) {
    userAPI.signin(email, password, (res)=> {
      if (!res) {
        toastr.error('Failed to signin')
      } else {
        this.state.playerID = res.userID
        socketAPI.userLoggedIn(this.state.playerID)
        this.state.gameComponent.setProps({page: 'SHOW_MENU', playerID: this.state.playerID})
      }
    })
  },

  'signup': function({email, userID, password}) {
    userAPI.signup(email, userID, password, (res)=> {
      if (!res) {
        toastr.error('Failed to signup')
      } else {
        this.state.playerID = res.userID
        socketAPI.userLoggedIn(this.state.playerID)
        this.state.gameComponent.setProps({page: 'SHOW_MENU', playerID: this.state.playerID})
      }
    })
  }
}

export default signupLogin
