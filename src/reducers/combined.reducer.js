import { combineReducers } from 'redux'
import login from './login.reducer'
import gameroom from './gameroom.reducer'

export default combineReducers({
  login,
  gameroom
})