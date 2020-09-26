import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import './Menu.css'

function Menu() {

  const { push } = useHistory()
  const [roomCode, setRoomCode] = useState('')
  const [modalActive, setModalActive] = useState('none')

  useEffect(() => {
    function closeModal(event) {
      if (event.target.className === 'modal') {
        setModalActive('none')
      }
    }

    window.addEventListener('click', closeModal)

    return function cleanupListener () {
      window.removeEventListener('click', closeModal)
    }
  }, [])

  return (
    <div className="Menu">
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <input 
          placeholder="Type Room Code" 
          style={{flex: 4}}
          onChange={event => setRoomCode(event.target.value)}/>
    
        <button 
          style={{
            flex: 1,
            height: '100%'
          }}
          onClick={() => push(`/game-room/${roomCode}`)}>Find</button> 
        
      </div>
      
      <button onClick={() => setModalActive('block')}>Create Game</button>

      <div className="modal" style={{display: modalActive}}>
        <div className="modal-content create-game">

        </div>
      </div>
    </div>
  )
}

export default Menu
