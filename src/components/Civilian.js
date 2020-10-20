import React, { useEffect } from 'react'
import { socket } from '../App'
import { useHistory } from 'react-router-dom'

function Civilian() {
  const { push } = useHistory()

  useEffect(() => {
    socket.on("appointed to zombie", () => {
      push("/in-game/zombie")
    })
  })

  return (
    <div>
      <h1>You are civilian!</h1>
    </div>
  )
}

export default Civilian
