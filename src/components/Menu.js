import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { roomCreated } from '../actions/gameroom.action'
import { socket } from '../App'
import './Menu.css'

function Menu() {
  const { push } = useHistory()

  const dispatch = useDispatch()

  const [roomCode, setRoomCode] = useState('')
  const [modalActive, setModalActive] = useState('none')
  const [roomInfo, setRoomInfo] = useState({
    roomTitle: "Let's play!(default)",
    numPlayers: 0
  })


  useEffect(() => {
    function closeModal(event) {
      if (event.target.className === 'modal') {
        setModalActive('none')
      }
    }

    window.addEventListener('click', closeModal)

    socket.on('send roomInfo', roomInfo => {
      dispatch(roomCreated(roomInfo))
      push(`/game-room/${roomInfo.roomcode}`)
    })

    socket.on('room found', roomInfo => {
      dispatch(roomCreated(roomInfo))
      push(`/game-room/${roomInfo.roomcode}`)
    })

    socket.on('full house', () => {
      window.alert('The room is full!')
    })

    socket.on('room not found', () => {
      window.alert('room not found!')
    })

    return function cleanupListener () {
      window.removeEventListener('click', closeModal)
    }
  }, [])

  function createGame() {
    if (roomInfo.numPlayers === 0) {
      window.alert("# of players must be > 0")
    } else {
      socket.emit('room created', roomInfo)
    }
  }

  function findRoom() {
    socket.emit('find room', roomCode)
  }

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
          onClick={findRoom}>Find</button> 
        
      </div>
      
      <button onClick={() => setModalActive('block')}>Create Game</button>

      <div className="modal" style={{display: modalActive}}>
        <div className="modal-content create-game">
          <input placeholder="Room Title" onChange={event => setRoomInfo({
            ...roomInfo,
            roomTitle: event.target.value
          })}/>
          <input placeholder="# of players" type="number" onChange={event => setRoomInfo({
            ...roomInfo,
            numPlayers: +event.target.value
          })}/>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            
            <button onClick={() => setModalActive(false)}>Cancel</button>
            <button onClick={createGame}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
