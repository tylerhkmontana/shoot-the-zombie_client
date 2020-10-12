const userEnter = (userName) => ({
  type: 'USER_ENTER',
  payload: userName
})

const userLogin = () => ({
  type: 'LOGIN'
})

const userConnect = (userId) => ({
  type: 'USER_CONNECT',
  payload: userId
})

export { userEnter, userLogin, userConnect }