import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserList } from '../actions/gameroom.action'
import { socket } from '../App'
import "./Gameroom.css"
 
function Gameroom() {
  const roomInfo = useSelector(state => state.gameroom)
  const dispatch = useDispatch()

  console.log(roomInfo)

  useEffect(() => {
    socket.on('user join gameroom', newRoomInfo => {
      dispatch(updateUserList(newRoomInfo.players))
    })

    socket.on('user leave gameroom', newRoomInfo => {
      dispatch(updateUserList(newRoomInfo.players))
    })
  }, [])
  return (
    <div className="Gameroom">
      <h4 style={{
        textAlign: 'center'
      }}>
        TITLE: {roomInfo.roomTitle} ROOM_CODE: {roomInfo.roomcode}
      </h4>
      
      <div style={{
        display: 'flex'
      }}>
        <div className="user-list">
          <p>{`${roomInfo.players.length}/${roomInfo.numPlayers}`}</p>
          {
            roomInfo.players.map(player => (
              <p key={player.id}>{player.userName}({player.id})</p>
            ))
          }
        </div>

        <div className="game-setting">

        </div>
      </div>
    </div>
  )
}

export default Gameroom
