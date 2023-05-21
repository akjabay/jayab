export default {
  setToken(token) {
    if (!token) {
      return
    }
    this.token = token;
    this.isUserLoggedIn = true;
    localStorage.setItem('token', token)
  },
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user))
  },
  updateUserInfo(data) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (data.name) {
      user.name = data.name
    }
    if (data.avatar) {
      user.avatar = data.avatar
    }
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user))
  },
  tryAutoLogin() {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const user = JSON.parse(localStorage.getItem('user'))
    this.token = token;
    this.user = user;
    this.isUserLoggedIn = true;
  },
  clearAuth() {
    localStorage.clear('user');
    localStorage.clear('token');
    this.token = null
    this.user = null
    this.isUserLoggedIn = false
    this.isAdmin = false
  }

}