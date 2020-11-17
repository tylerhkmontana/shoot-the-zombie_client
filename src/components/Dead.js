import React from 'react'
import graveStone from './images/grave_stone.png'
import './Dead.css'

function Dead() {
  return (
    <div className="Dead">
      <h1>RIP</h1>
      <img src={graveStone}/>
    </div>
  )
}

export default Dead
