import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../App'


function InGame() {

  const userId = useSelector(state => state.login.userId)

  useEffect(() => {
    socket.emit('what is my role', userId)
    
    socket.on('appointed to zombie', () => {
      console.log("YOU ARE THE ZOMBIE")
    })

    socket.on('appointed to leader', () => {
      console.log("YOU ARE THE LEADER")
    })

    socket.on('appointed to civilian', () => {
      console.log("YOU ARE THE CIVILIAN")
    })
  })

  return (
    <div>
      <p>In Game</p>
    </div>
  )
}

export default InGame
