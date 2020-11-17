import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import { Gif } from '@giphy/react-components'
import './Sheriff.css'

function Sheriff() {
  const [sheriffPower, setSheriffPower] = useState({
    numBullets: 0,
    targetPlayers: []
  })

  const [reloadCount, setReloadCount] = useState(0)

  const [gifData, setGifData] = useState(null)

  useEffect(() => {
    let reloadBullet
    let reloadCountTimer
    let mounted = true

    socket.emit("I am the sheriff")

    socket.emit("request gif")
    
    socket.on("response gif", response => {
      if(mounted) {
        setGifData(response)
      }
    })

    socket.on("gif updated", response => {
      if (mounted) {
        setGifData(response)
      }
    })

    socket.on("receive bullets", payload => {
      if (mounted) {
        let count = payload.reloadInterval /1000
        setReloadCount(count)
        reloadCountTimer = setInterval(() => {
          setReloadCount(--count)
          if(count === 0) {
            clearInterval(reloadCountTimer)
          }
        }, 1000)
        
        reloadBullet = setTimeout(() => {  
          socket.emit("reload bullet")
        }, payload.reloadInterval)
        
        setSheriffPower({
          numBullets: payload.numBullets,
          targetPlayers: payload.targetPlayers
        })
      }
    })

    socket.on("receive targetlist", list => {
      if (mounted) {
        setSheriffPower(prevState => {
          console.log(prevState)
          return {
            ...prevState,
            targetPlayers: list
          }
        })
      }
    })

    socket.on("Gameover", () => {
      console.log("clearing interval")
      clearInterval(reloadBullet)
    })

    return function cleanup() {
      clearTimeout(reloadBullet)
      clearInterval(reloadCountTimer)
      mounted = false
    }
  }, [])

  function killPlayer(targetId) {
    socket.emit("sheriff shoots player", targetId)
  } 

  return (
    <div className="Sheriff">
      <h1>You are the sheriff</h1>

      <div className="instruction">
        <span>[Instruction]</span>
        <p>*Choose whom to kill</p>
        <p>**If you kill an innocent civilian, you lose your position.</p>
        <p>***Stop the virus!!!</p>
      </div>
      <br/>
      <div className="sheriff-power">
        <p>{sheriffPower.numBullets} bullet(s) left.</p>
        <p>bullet++ in {reloadCount} sec...</p>
        <span>[Target List]</span>
        <div className="target-list">
        {
          sheriffPower.targetPlayers.map(player => {
            return <button className="target-players" onClick={() => killPlayer(player.id)} key={player.id}>{player.userName}</button>
          })
        }
        </div>
      </div>
    
      
      <p>[SECRET GIF]</p>
      {
        gifData ? <Gif gif={gifData} width={300}/> : <p>NO GIF RECEIVED</p>
      }
    </div>
  )
}

export default Sheriff
