import axios from 'axios'
import jwtDecode from 'jwt-decode'

class AuthClient {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/api',
      headers: {
      // post:{
      //   token: //only for post token
      // }
        common: {
          token: this.getToken()
        }
      }
    })//this until here represents defaults
  }

  signUp(userInfo) {
    return this.request({method: 'POST', url: '/users', data: userInfo})
      .then((response) => response.data.success)
  }
  logIn(credentials){ //email and password -info need to log in
    return this.request({method: 'POST', url: '/authenticate', data: credentials})
      .then(response => {
        if(response.data.success) { //if successfully logged in
          const token = response.data.token //if success is true we can assume token is in there
          this.setToken(token)
          return jwtDecode(token) //token for name,id,email of the user
        } else {
          return false
        }
      })
  }
  getCurrentUser(){
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }
  getToken() {
    // retrieve token from local storage:
    return localStorage.getItem('token')
  }

  setToken(token) {
    // save token to localStorage:
    localStorage.setItem('token', token)
    // tell axios to always include this token in headers:
    this.request.defaults.headers.common.token = token  //setting a property of an object
    return token
  }

  clearToken() {
    // remove token from localStorage:
    localStorage.removeItem('token')

    // tell axios to stop sending with token:
    delete this.request.defaults.headers.common.token //delete key val pair from an object
  }

  getProducts() {
    return this.request({method: 'GET', url: '/products'})
      // .then(response => {
      //   // if(response) {
      //   console.log(response)
      //     response.data
      //   // }
      // })
    }

}

export default new AuthClient()
