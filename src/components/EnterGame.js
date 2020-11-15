import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { socket } from '../App'
import { useDispatch } from 'react-redux'
import { userEnter, userLogin } from '../actions/login.action'
import './EnterGame.css'


function EnterGame() {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const [currUserName, setCurrUserName] = useState('')

  function enter() {
    if(currUserName === '') {
      window.alert("What is your name?")
    } else {
      console.log(currUserName)
      dispatch(userEnter(currUserName))
      dispatch(userLogin())
      socket.emit('user enter', currUserName)
      push('/menu')
    }
  }

  return (
    <div className="Entergame">
      <img className="welcome-zombie" src="entrance_zombie.gif" alt="entrance_zombie_image"/>
      <div className="input-group">
        <input placeholder="name" 
          onChange={event => setCurrUserName(event.target.value.trim())} />
        <button 
          className="enter-button"
          to="/menu" onClick={enter}>Enter</button>
      </div>
    </div>
  )
}

export default EnterGame
