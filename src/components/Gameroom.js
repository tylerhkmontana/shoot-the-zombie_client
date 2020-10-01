import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../App'
 
function Gameroom() {
  const roomInfo = useSelector(state => state.gameroom)
  console.log(roomInfo)

  useEffect(() => {
    socket.on('user join gameroom', newRoomInfo => {
      console.log(newRoomInfo)

      // Dispatch newRoomInfo
    })
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default Gameroom
