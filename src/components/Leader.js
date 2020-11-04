import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import { useSelector } from 'react-redux'
import './Leader.css'

function Leader() {

  const userId = useSelector(state => state.login.userId)
  const [leadersPower, setLeaderPower] = useState({
    numBullets: 0,
    targetPlayers: []
  })

  console.log("Rendering")

  useEffect(() => {
    socket.emit("I am the leader")

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
    }, 3000)

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

      <p>You have {leadersPower.numBullets} bullets left.</p>
      {
        leadersPower.targetPlayers.map(player => {
          return <button className="target-players" onClick={() => killPlayer(player.id)} key={player.id}>{player.userName}</button>
        })
      }
    </div>
  )
}

export default Leader
