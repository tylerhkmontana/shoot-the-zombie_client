import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { updateUserList } from '../actions/gameroom.action'
import { socket } from '../App'
import Icon from '@mdi/react'
import { mdiMinusBox, mdiPlusBox, mdiBullet } from '@mdi/js'
import "./Gameroom.css"
 
function Gameroom() {
  const roomInfo = useSelector(state => state.gameroom)
  const userId = useSelector(state => state.login.userId)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [isRoomMaster, setIsRoomMaster] = useState(false)
  const [gameSetting, setGameSetting] = useState({
    numBullets: 1,
    infectionRate: 10000
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

  function setNumBullets(isIncrease) {
    let numBullets = gameSetting.numBullets
    let didReachMax = numBullets === 3 && isIncrease
    let didReachMin = numBullets === 0 && !isIncrease

    if (!didReachMax && !didReachMin) {
      setGameSetting({
        ...gameSetting,
        numBullets: isIncrease ? ++numBullets : --numBullets
      })
    }
  }

  function setInfectionRate(isIncrease) {
    let infectionRate = gameSetting.infectionRate
    let didReachMax = infectionRate === 60000 && isIncrease
    let didReachMin = infectionRate === 15000 && !isIncrease
    
    if (!didReachMax && !didReachMin) {
      setGameSetting({
        ...gameSetting,
        infectionRate: isIncrease ? infectionRate + 5000 : infectionRate - 5000
      })
    }
  }

  return (
    <div className="Gameroom">

      <div className="room-info">
        <h4>TITLE: {roomInfo.roomTitle}</h4>
        <h4>ROOM_CODE: {roomInfo.roomcode}</h4>
      </div>
    
      <div className="user-list">
        <span
          style={{
            position: 'sticky', 
            top: 0, 
            textAlign: 'center',
            backgroundColor: 'black',
            width: '100%',
            zIndex: 1
        }}>
          {`${roomInfo.players.length}/${roomInfo.numPlayers}`}
        </span>
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

      {
        isRoomMaster ?
        <div className="game-setting">
          <div className="setting">
            <p style={{flex: 1}}>Infection_rate:</p>
            <div style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
              <Icon 
                path={mdiMinusBox} 
                size={1}
                color="#00fe00"
                onClick={() => setInfectionRate(false)}/>
              <p>{gameSetting.infectionRate /1000} s</p>
              <Icon 
                path={mdiPlusBox}
                size={1}
                color="#00fe00"
                onClick={() => setInfectionRate(true)}/>
            </div>
          </div>
          <div className="setting">
            <p style={{flex: 1}}>Initial_#bullets:</p>
            <div style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
              <Icon 
                path={mdiMinusBox} 
                size={1}
                color="#00fe00"
                onClick={() => setNumBullets(false)}/>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Icon
                  path={mdiBullet}
                  size={1}
                  color="#00fe00"/>
                  X {gameSetting.numBullets}
              </span>
              <Icon 
                path={mdiPlusBox}
                size={1}
                color="#00fe00"
                onClick={() => setNumBullets(true)}/>
            </div>
          </div> 
        </div> : ''
      }
    
      <div className="button-group">
          {
            isRoomMaster ?
              <button onClick={startGame}>Start</button> :
              ''
          }
          <button onClick={exitRoom}>Exit</button>
        </div>
    </div>
  )
}

export default Gameroom
