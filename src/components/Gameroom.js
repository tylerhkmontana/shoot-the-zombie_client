import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { updateUserList } from '../actions/gameroom.action'
import { socket } from '../App'
import Icon from '@mdi/react'
import { mdiMinusBox, mdiPlusBox } from '@mdi/js'
import "./Gameroom.css"
 
function Gameroom() {
  const roomInfo = useSelector(state => state.gameroom)
  const userId = useSelector(state => state.login.userId)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [isRoomMaster, setIsRoomMaster] = useState(false)
  const [gameSetting, setGameSetting] = useState({
    numBullets: 1,
    infectionRate: 5000
  })
  
  useEffect(() => {
    socket.on('user join gameroom', newRoomInfo => {
      dispatch(updateUserList(newRoomInfo.players))
    })

    socket.on('user leave gameroom', payload => {
      dispatch(updateUserList(payload.roomInfo.players))
    })

    socket.on('game started', () => {
      push('/in-game')
    })
  }, [])

  useEffect(() => {
    const roomMaster = roomInfo.players[0]
    
    if (roomMaster.id === userId) {
      setIsRoomMaster(true)
    }
  }, [roomInfo])

  function startGame() {
    if (roomInfo.players.length === roomInfo.numPlayers) {
      let inGameRoomInfo = { ...roomInfo, gameSetting }
      socket.emit('start game', inGameRoomInfo)
    } else {
      window.alert("The room is not full yet!")
    }
  }

  function exitRoom() {
    socket.emit("user exit room")
    push("/menu")
  }

  return (
    <div className="Gameroom">
      <div className="room-info">
        <h4>TITLE: {roomInfo.roomTitle}</h4>
        <h4>ROOM_CODE: {roomInfo.roomcode}</h4>
      </div>
    
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="user-list">
          <p>{`${roomInfo.players.length}/${roomInfo.numPlayers}`}</p>
          {
            roomInfo.players.map((player, i) => {
              if (i === 0 && player.id === userId) {
                return <p key={player.id}>{player.userName}(YOU)(Master)</p>
              } else if (i === 0) {
                return <p key={player.id}>{player.userName}(Master)</p>
              } else if (player.id === userId) {
                return <p key={player.id}>{player.userName}(YOU)</p>
              } else {
                return <p key={player.id}>{player.userName}</p>
              } 
            })
          }
        </div>

        <div className="game-setting">
          <div className="infection-rate-setting">
            <p style={{flex: 1}}>Infection_rate:</p>
            <div style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
              <Icon 
                path={mdiMinusBox} 
                size={1}
                color="#00fe00"/>
              <p>{gameSetting.infectionRate /1000} s</p>
              <Icon 
                path={mdiPlusBox}
                size={1}
                color="#00fe00"/>
            </div>
          </div>
          
          {/* {
            isRoomMaster ? 
            <div>
              <input placeholder="# of bullets" type="number"/>
              <select onChange={event => console.log(event.target.value)}>
                <option value="5000">5 sec</option>
                <option value="10000">10 sec</option>
                <option value="15000">15 sec</option>
              </select>
            </div> :
            ''
          } */}
          <div>
            <button onClick={exitRoom}>Exit</button>
            { 
              isRoomMaster ? 
                <button onClick={startGame}>Start</button> :
                ''
            }
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Gameroom
