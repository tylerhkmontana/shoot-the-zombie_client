const initialState = {
  messages: []
}

const messageReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case 'UPDATE_MESSAGE':
      return {
        messages: [...state.messages, actions.payload]
      }
    case 'DELETE_MESSAGE':
      const targetMessage = actions.payload
      let messages = [...state.messages]
      messages.splice(messages.indexOf(targetMessage), 1)
      return {
        messages
      }
    default:
      return state
  }
}

export default messageReducer