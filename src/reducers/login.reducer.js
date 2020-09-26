const initialState = {
  userName: null,
  isLogged: false,
  userId: null
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_CONNECT':
      return {
        ...state,
        userId: action.payload
      }
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