import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { roomCreated } from '../actions/gameroom.action'
import { appointedTo } from '../actions/inGame.action'
import { Route, useHistory } from 'react-router-dom'
import { socket } from '../App'

import Civilian from './Civilian'
import Zombie from './Zombie'
import Leader from './Leader'
import Dead from './Dead'
import Gameover from './Gameover'

function InGame() {
  const dispatch = useDispatch()
  const { push } = useHistory()

  useEffect(() => {
    // socket.emit('what is my role', userId)
    
    socket.on('appointed to zombie', () => {
      console.log("YOU ARE THE ZOMBIE")
      dispatch(appointedTo('zombie'))
      push("/in-game/zombie")
    })

    socket.on('appointed to leader', () => {
      console.log("YOU ARE THE LEADER")
      dispatch(appointedTo('civilian'))
      push("/in-game/leader")
    })

    socket.on('appointed to civilian', () => {
      console.log("YOU ARE THE CIVILIAN")
      dispatch(appointedTo('civilian'))
      push("/in-game/civilian")
    })

    socket.on("you are dead", () => {
      console.log("YOU ARE DEAD!")
      push("/in-game/dead")
    })

    socket.on("Gameover", winner => {
      setTimeout(() => push(`/in-game/gameover/${winner}`), 3000)
    })

    socket.on("move to room", roomInfo => {
      dispatch(roomCreated(roomInfo))
      push(`/game-room/${roomInfo.roomcode}`)
    })
  }, [])

  return (
    <div>
      <p>In Game</p>
      <Route path="/in-game/civilian" component={Civilian}/>
      <Route path="/in-game/zombie" component={Zombie}/>
      <Route path="/in-game/leader" component={Leader}/>
      <Route path="/in-game/dead" component={Dead} />
      <Route path="/in-game/gameover/:winner" component={Gameover} />
    </div>
  )
}

export default InGame
