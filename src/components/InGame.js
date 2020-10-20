import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import { socket } from '../App'

import Civilian from './Civilian'
import Zombie from './Zombie'
import Leader from './Leader'

function InGame() {

  const userId = useSelector(state => state.login.userId)
  const { push } = useHistory()

  useEffect(() => {
    socket.emit('what is my role', userId)
    
    socket.on('appointed to zombie', () => {
      console.log("YOU ARE THE ZOMBIE")
      push("/in-game/zombie")
    })

    socket.on('appointed to leader', () => {
      console.log("YOU ARE THE LEADER")
      push("/in-game/leader")
    })

    socket.on('appointed to civilian', () => {
      console.log("YOU ARE THE CIVILIAN")
      push("/in-game/civilian")
    })

    
  })

  return (
    <div>
      <p>In Game</p>
      <Route path="/in-game/civilian" component={Civilian}/>
      <Route path="/in-game/zombie" component={Zombie}/>
      <Route path="/in-game/leader" component={Leader}/>
    </div>
  )
}

export default InGame
