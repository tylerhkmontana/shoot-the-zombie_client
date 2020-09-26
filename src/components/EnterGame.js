import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userEnter, userLogin } from '../actions/loggin.action'

function EnterGame() {
  const dispatch = useDispatch()

  const [currUserName, setCurrUserName] = useState(null)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      margin: '200px auto 0px auto',
      height: '200px',
      justifyContent: 'space-evenly'
    }}>
      <input placeholder="name" 
        onChange={event => setCurrUserName(event.target.value)} />
      <Link style={{
        height: '2em',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} to="/menu" onClick={() => {
        dispatch(userEnter(currUserName))
        dispatch(userLogin())
      }}>Enter</Link>
    </div>
  )
}

export default EnterGame
