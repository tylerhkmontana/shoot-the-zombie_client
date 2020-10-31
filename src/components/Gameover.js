import React from 'react'
import { useSelector } from 'react-redux'

function Gameover(props) {

  const userRole = useSelector(state => state.inGame.role)
  const winner = props.match.params.winner

  return (
    <div>
      <h1>Game Over</h1>
      <p>Winner: {winner}</p>
      <p>{userRole === winner ? "You Win!" : "You Lose!"}</p>
    </div>
  )
}

export default Gameover
