import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import { Gif } from '@giphy/react-components'
import Icon from '@mdi/react'
import { mdiPoliceBadge } from '@mdi/js'
import './Leader.css'

function Leader() {
  const [leadersPower, setLeaderPower] = useState({
    numBullets: 0,
    targetPlayers: []
  })

  const [gifData, setGifData] = useState(null)

  useEffect(() => {
    socket.emit("I am the leader")

    socket.emit("request gif")
    
    socket.on("response gif", response => setGifData(response))

    socket.on("gif updated", response => setGifData(response))

    socket.on("receive bullets", payload => {
      setLeaderPower({
        numBullets: payload.numBullets,
        targetPlayers: payload.targetPlayers
      })
    })

    socket.on("Gameover", () => {
      console.log("clearing interval")
      clearInterval(reloadBullet)
    })

    const reloadBullet = setInterval(() => {
      socket.emit("reload bullet")
      console.log("Reloading")
    }, 5000)

    return function cleanup() {
      clearInterval(reloadBullet)
    }
  }, [])

  function killPlayer(targetId) {
    socket.emit("leader shoots player", targetId)
  } 

  return (
    <div>
      <h1>You are Leader</h1>
      <Icon path={mdiPoliceBadge} size={3} color={'#00fe00'}/>

      <p>You have {leadersPower.numBullets} bullets left.</p>
      {
        leadersPower.targetPlayers.map(player => {
          return <button className="target-players" onClick={() => killPlayer(player.id)} key={player.id}>{player.userName}</button>
        })
      }

      {
        gifData ? <Gif gif={gifData} width={300}/> : <p>NO GIF RECEIVED</p>
      }
    </div>
  )
}

export default Leader
