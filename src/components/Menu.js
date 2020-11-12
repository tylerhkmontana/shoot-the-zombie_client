import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { roomCreated } from '../actions/gameroom.action'
import Icon from "@mdi/react"
import { mdiPlusBox, mdiMinusBox } from '@mdi/js'
import { socket } from '../App'
import './Menu.css'

function Menu() {
  const { push } = useHistory()

  const dispatch = useDispatch()

  const [roomCode, setRoomCode] = useState('')
  const [modalActive, setModalActive] = useState('none')
  const [roomInfo, setRoomInfo] = useState({
    roomTitle: "Let's play!(default)",
    numPlayers: 4
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
      window.alert('The room is not found!')
    })

    socket.on('room in game', () => {
      window.alert('The room is in game!')
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

  function increaseNumPlayer () {
    let numPlayers = roomInfo.numPlayers
    if (numPlayers === 14) {
      window.alert("You reached maximum number of players")
    } else {
      setRoomInfo({
        ...roomInfo,
        numPlayers: ++numPlayers
      })
    } 
  }

  function decreaseNumPlayer() {
    let numPlayers = roomInfo.numPlayers
    if (numPlayers === 4) {
      window.alert("You require at least 4 people in a room")
    } else {
      setRoomInfo({
        ...roomInfo,
        numPlayers: --numPlayers
      })
    } 
  }

  return (
    <div className="Menu">
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <input 
          placeholder="Type Room Code" 
          style={{flex: 4, marginRight: '5px'}}
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
        <div className="modal-content">
          <div className="create-game">
            <input placeholder="Room Title" onChange={event => setRoomInfo({
              ...roomInfo,
              roomTitle: event.target.value
            })}/>
            <div className="num-players-input">
              <Icon 
                path={mdiMinusBox} 
                size={1}
                color="white"
                onClick={decreaseNumPlayer}/>
              <p>{roomInfo.numPlayers}</p>
              <Icon 
                path={mdiPlusBox}
                size={1}
                color="white"
                onClick={increaseNumPlayer}/>
            </div>

            <div className="button-group">
              <button onClick={() => setModalActive(false)}>Cancel</button>
              <button onClick={createGame}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
