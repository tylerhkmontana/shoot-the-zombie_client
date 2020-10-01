const initialState = {
  roomTitle: null,
  numPlayers: null,
  roomcode: null,
  players: []
}

const gameroomReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case 'ROOM_CREATED':
      return {
        ...actions.payload
      }
    default:
      return state
  }
}

export default gameroomReducer