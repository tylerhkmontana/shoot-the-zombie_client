import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../App'
import './WaitingRoom.css'

function WaitingRoom() {
  const userName = useSelector(state => state.userName)
  const userId = useSelector(state => state.userId)

  const [userlist, setUserList] = useState([])

  // useEffect(() => {
  //   let isSubscribed = true
    
  //   socket.emit('user enter waiting-room', userName)

  //   socket.on('refresh userlist_waiting', newUserList => {
  //     if(isSubscribed) {
  //       setUserList([...newUserList])
  //     }
  //   })
    
  //   return function cleanup() {
  //     socket.emit('user leave waiting-room')
  //     isSubscribed = false
  //   } 
  // }, [])

  return (
    <div className="WaitingRoom">
      <h1>Welcome {userName}_{userId}!</h1>

      <div className="dashboard">
        <div className="user-list">
          {
            userlist.map(user => {
              return <p key={user.id}>{user.userName}</p>
            })
          }
        </div>

        <div className="gameroom-list">
          
        </div>

        <div className="create-gameroom">

        </div>
      </div>
    </div>
  )
}

export default WaitingRoom
