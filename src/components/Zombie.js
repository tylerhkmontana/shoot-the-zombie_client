import React from 'react'
import zombieDoctor from './images/Zombiedoctor.gif'
import './Zombie.css'

function Zombie() {
  return (
    <div className="Zombie">
      <h1>You became a zombie grrr.r..rr</h1>
      <img src={zombieDoctor}/>

      <div className="instruction">
        <span>[Instruction]</span>
        <p>*pretend like you are a civilian</p>
        <p>**Spread the virus!!!</p>
      </div>
    </div>
  )
}

export default Zombie
