import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import { useHistory } from 'react-router-dom'
import { Gif } from '@giphy/react-components'

function Civilian() {
  const { push } = useHistory()

  useEffect(() => {
    socket.emit("request gif")
    
    socket.on("response gif", response => {
      setGifData(response)
    })
  }, [])

  const [gifData, setGifData] = useState(null)

  return (
    <div>
      <h1>You are civilian!</h1>
      {
        gifData ? <Gif gif={gifData} width={300}/> : ''
      }
    </div>
  )
}

export default Civilian
