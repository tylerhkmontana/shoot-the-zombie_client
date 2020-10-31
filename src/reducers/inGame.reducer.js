const initialState = {
  role: 'none'
}

const inGameReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case 'APPOINTED_TO': 
      return {
        role: actions.payload
      }
    default: 
      return state
  }
}

export default inGameReducer