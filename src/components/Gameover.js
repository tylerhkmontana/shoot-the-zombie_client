import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { socket } from '../App'
import './Gameover.css'

import zombieWin from './images/zombie_win.png'
import zombieLose from './images/zombie_lose.jpg'
import civilianWin from './images/civilian_win.png'
import civilianLose from './images/civilian_lose.jpg'

function Gameover() {

  const roomInfo = useSelector(state => state.gameroom)
  const [roomMaster] = roomInfo.players
  const userId = useSelector(state => state.login.userId)
  const userRole = useSelector(state => state.inGame.role)
  const { winner } = useParams()
  const { push } = useHistory()

  function moveToRoom() {
    socket.emit('restart')
  }

  function exitRoom() {
    socket.emit('user exit room')
    push('/menu')
  }

  const banner = () => {
    if (userRole === 'zombie') {
      return <img src={userRole === winner ? zombieWin : zombieLose} alt="zombie_lose_or_win"/>
    } else {
      return <img src={userRole === winner ? civilianWin : civilianLose} alt="civilian_lose_or_win"/>
    }
  }

  return (
    <div className="Gameover">
      <h1>Game Over</h1>
    
      {
        userRole === winner ? 
          <p>You Win!</p> :
          <p style={{color: 'crimson'}}>You Lose...</p>
      }
      { banner() }

      <div className="button-group">
        { 
          roomMaster.id === userId ? 
            <button className="positive-button" onClick={moveToRoom}>Restart</button> : 
            <p>Waiting for RoomMaster to restart...</p> 
        }
        <button onClick={exitRoom}>Exit</button>
      </div>
    </div>
  )
}

export default Gameover
