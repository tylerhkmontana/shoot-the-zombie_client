import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { roomCreated } from '../actions/gameroom.action'
import { appointedTo } from '../actions/inGame.action'
import { Route, useHistory } from 'react-router-dom'
import { socket } from '../App'
import Icon from '@mdi/react'
import { mdiHuman, mdiSkull } from '@mdi/js'

import Civilian from './Civilian'
import Zombie from './Zombie'
import Leader from './Leader'
import Dead from './Dead'

function InGame() {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [virusTimer, setVirusTimer] = useState(0)

  useEffect(() => {
    socket.on('virus timer', (count) => {
      let currCount = count/1000
      setVirusTimer(currCount)
      const countTimer = setInterval(() => {
        setVirusTimer(--currCount)
        if (currCount === 0) {
          clearTimeout(countTimer)
        }
      }, 1000)
    })

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
      setTimeout(() => push(`/gameover/${winner}`), 3000)
    })

    socket.on("move to room", roomInfo => {
      dispatch(roomCreated(roomInfo))
      push(`/game-room/${roomInfo.roomcode}`)
    })
  }, [])

  return (
    <div>
      <div className="game-status">
        <p>Zombie virus will spread in {virusTimer} sec...</p>
        <img src="zombie.svg" width="25px"/>
        <Icon path={mdiHuman} size={2}/>
        <Icon path={mdiSkull} size={2}/>
      </div>
      <Route path="/in-game/civilian" component={Civilian}/>
      <Route path="/in-game/zombie" component={Zombie}/>
      <Route path="/in-game/leader" component={Leader}/>
      <Route path="/in-game/dead" component={Dead} />
    </div>
  )
}

export default InGame
