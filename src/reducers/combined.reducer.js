import { combineReducers } from 'redux'
import login from './login.reducer'
import gameroom from './gameroom.reducer'
import inGame from  './inGame.reducer'

export default combineReducers({
  login,
  gameroom,
  inGame
})