const initialState = {
  userName: null,
  isLogged: false
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_ENTER':
      return {
        ...state,
        userName: action.payload
      }
    case 'LOGIN':
      return {
        ...state,
        isLogged: true
      }
    default:
      return state
  }
}

export default loginReducer