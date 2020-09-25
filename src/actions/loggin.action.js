const userEnter = (userName) => ({
  type: 'USER_ENTER',
  payload: userName
})

const userLogin = () => ({
  type: 'LOGIN'
})

export { userEnter, userLogin }