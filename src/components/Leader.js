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

  const [reloadCount, setReloadCount] = useState(0)

  const [gifData, setGifData] = useState(null)

  useEffect(() => {
    let reloadBullet
    let reloadCountTimer

    socket.emit("I am the leader")

    socket.emit("request gif")
    
    socket.on("response gif", response => setGifData(response))

    socket.on("gif updated", response => setGifData(response))

    socket.on("receive bullets", payload => {
      let count = payload.reloadInterval /1000
      setReloadCount(count)
      reloadCountTimer = setInterval(() => {
        setReloadCount(--count)
        if(count === 0) {
          clearInterval(reloadCountTimer)
        }
      }, 1000)
      
      setTimeout(() => {  
        socket.emit("reload bullet")
      }, payload.reloadInterval)
      
      setLeaderPower({
        numBullets: payload.numBullets,
        targetPlayers: payload.targetPlayers
      })
    })

    socket.on("receive targetlist", list => {
      setLeaderPower(prevState => {
        return {
          ...prevState,
          targetPlayers: list
        }
      })
    })

    socket.on("Gameover", () => {
      console.log("clearing interval")
      clearInterval(reloadBullet)
    })

    return function cleanup() {
      clearTimeout(reloadBullet)
      clearInterval(reloadCountTimer)
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
      <p>A bullet will be supplied in {reloadCount} sec...</p>
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
