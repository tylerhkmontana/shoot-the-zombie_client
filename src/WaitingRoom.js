import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { useSelector } from 'react-redux'

var socket
const ENDPOINT = process.env.ENDPOINT || 'http://127.0.0.1:5000'

function WaitingRoom() {
  const userName = useSelector(state => state.userName)

  const [userlist, setUserlist] = useState([])

  useEffect(() => {
    socket = socketIOClient(ENDPOINT)
    socket.emit('user enter waiting-room', userName)

    socket.on('refresh userlist_waiting', newUserlist => setUserlist([...newUserlist]))

    socket.on('user leave waiting-room', newUserlist => setUserlist([...newUserlist]))
  }, [])

  return (
    <div>
      <h1>WaitingRoom</h1>
      <h1>Welcome {userName}!</h1>
      {
        userlist.map(user => {
          return <p key={user.id}>{user.userName}</p>
        })
      }
    </div>
  )
}

export default WaitingRoom
