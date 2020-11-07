import { combineReducers } from 'redux'
import login from './login.reducer'
import gameroom from './gameroom.reducer'
import inGame from  './inGame.reducer'
import message from './message.reducer'

export default combineReducers({
  login,
  gameroom,
  inGame,
  message
})