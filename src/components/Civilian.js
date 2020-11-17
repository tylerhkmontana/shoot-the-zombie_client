import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import { Gif } from '@giphy/react-components'
import './Civilian.css'

function Civilian() {
  useEffect(() => {
    let mounted = true
    socket.emit("request gif")
    
    socket.on("response gif", response => {
      if (mounted) {
        setGifData(response)
      }
    })

    socket.on("gif updated", response => {
      if (mounted) {
        setGifData(response)
      }
    })
    
    return function cleanup() {
      mounted = false
    }
  }, [])

  const [gifData, setGifData] = useState(null)

  return (
    <div className="Civilian">
      <h1>You are a civilian!</h1>

      <div className="instruction">
      <span>[Instruction]</span>
        <p>*Be cooperative with the sheriff</p>
        <p>**Think of a word relevent to 'SECRET GIF'</p>
        <p>***Stop the virus!!!</p>
      </div>

      <p>[SECRET GIF]</p>
      {
        gifData ? <Gif gif={gifData} width={300}/> : <p>NO GIF RECEIVED</p>
      }
    </div>
  )
}

export default Civilian
