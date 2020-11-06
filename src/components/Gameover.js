import React from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../App'

function Gameover(props) {

  const roomInfo = useSelector(state => state.gameroom)
  const [roomMaster] = roomInfo.players
  const userId = useSelector(state => state.login.userId)
  const userRole = useSelector(state => state.inGame.role)
  const winner = props.match.params.winner

  return (
    <div>
      <h1>Game Over</h1>
      <p>Winner: {winner}</p>
      <p>{userRole === winner ? "You Win!" : "You Lose!"}</p>
      {roomMaster.id === userId ? <button onClick={() => socket.emit("start game", roomInfo)}>Restart</button> : ''}
    </div>
  )
}

export default Gameover
