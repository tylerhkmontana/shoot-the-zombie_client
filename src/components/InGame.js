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

import './InGame.css'

function InGame() {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [virusTimer, setVirusTimer] = useState(0)
  const [gameStatus, setGameStatus] = useState({
    zombie: 0,
    civilian: 0,
    dead: 0
  })

  useEffect(() => {
    let mounted = true
    let gameoverTimeout

    socket.on('virus timer', (count) => {
      if (mounted) {
        let currCount = count/1000
        setVirusTimer(currCount)
        const countTimer = setInterval(() => {
          setVirusTimer(--currCount)
          if (currCount === 0) {
            clearTimeout(countTimer)
          }
        }, 1000)
      }
    })

    socket.on('update status', status => {
      if(mounted) {
        setGameStatus({
          ...status
        })
      }
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
      gameoverTimeout = setTimeout(() => push(`/gameover/${winner}`), 5000)
    })


    socket.on("move to room", roomInfo => {
      dispatch(roomCreated(roomInfo))
      push(`/game-room/${roomInfo.roomcode}`)
    })
    
    return function cleanup() {
      mounted = false
      clearTimeout(gameoverTimeout)
    }
  }, [])

  return (
    <div>
      <div className="game-status">
        <p>[Game Status]</p>
        <p><img src="zombie.svg" width="25px"/> x {gameStatus.zombie}</p>
        <p><Icon path={mdiHuman} size={2}/> x {gameStatus.civilian}</p>
        <p><Icon path={mdiSkull} size={2}/> x {gameStatus.dead}</p>
        <p style={{color: 'crimson'}}>Zombie virus will spread in {virusTimer} sec...</p>
      </div>
      <Route path="/in-game/civilian" component={Civilian}/>
      <Route path="/in-game/zombie" component={Zombie}/>
      <Route path="/in-game/leader" component={Leader}/>
      <Route path="/in-game/dead" component={Dead} />
    </div>
  )
}

export default InGame
