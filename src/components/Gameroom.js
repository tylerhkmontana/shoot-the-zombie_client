import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserList } from '../actions/gameroom.action'
import { socket } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import "./Gameroom.css"
 
function Gameroom() {
  const roomInfo = useSelector(state => state.gameroom)
  const userId = useSelector(state => state.login.userId)
  const dispatch = useDispatch()

  const [isRoomMaster, setIsRoomMaster] = useState(false)
  const [gameSetting, setGameSetting] = useState({
    numBullets: 1,
    infectionRate: 5000,
    tableFormation: []
  })

  const [messages, setMessages] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  
  useEffect(() => {
    socket.on('user join gameroom', newRoomInfo => {
      dispatch(updateUserList(newRoomInfo.players))
      let joinedPlayer = newRoomInfo.players[newRoomInfo.players.length - 1]

      if (newRoomInfo.players.length === newRoomInfo.numPlayers) {
        setGameSetting(gameSetting => ({
          ...gameSetting,
          tableFormation: newRoomInfo.players
        }))
      }

      setMessages(messages => [...messages, `${joinedPlayer.userName} has joined the room`])
    })

    socket.on('user leave gameroom', payload => {
      dispatch(updateUserList(payload.roomInfo.players))
      let leavingPlayer = payload.leavingUser
      setMessages(messages => [...messages, `${leavingPlayer.userName} has left the room`])
    })
  }, [])

  useEffect(() => {
    setGameSetting({
      ...gameSetting,
      tableFormation: [...roomInfo.players]
    })

    const roomMaster = roomInfo.players[0]
    
    if (roomMaster.id === userId) {
      setIsRoomMaster(true)
    }
  }, [])

  function changeTableFormation(event) {
    // DRAG AND DROP for PC ver 
    // const draggedPlayer = event.dataTransfer.getData("player")
    // const targetPlayer = event.target.id
    // const currTableFormation = [...gameSetting.tableFormation]

    // const draggedPlayerIndex = currTableFormation.findIndex(player => player.id === draggedPlayer)
    // const targetPlayerIndex = currTableFormation.findIndex(player => player.id === targetPlayer)

    // const temp = currTableFormation[targetPlayerIndex]
    // currTableFormation[targetPlayerIndex] = currTableFormation[draggedPlayerIndex]
    // currTableFormation[draggedPlayerIndex] = temp

    // setGameSetting(gameSetting => ({
    //   ...gameSetting,
    //   tableFormation: [...currTableFormation]
    // }))
    const targetPlayer = event.target.id
    const currTableFormation = [...gameSetting.tableFormation]

    if (selectedPlayer) {
      if (selectedPlayer !== targetPlayer) {
        const targetPlayerIndex = currTableFormation.findIndex(player => player.id === targetPlayer)
        const selectedPlayerIndex = currTableFormation.findIndex(player => player.id === selectedPlayer)

        const temp = currTableFormation[selectedPlayerIndex]
        currTableFormation[selectedPlayerIndex] = currTableFormation[targetPlayerIndex]
        currTableFormation[targetPlayerIndex] = temp
        setGameSetting(gameSetting => ({
          ...gameSetting,
          tableFormation: [...currTableFormation]
        }))
      }
      setSelectedPlayer(null)
    } else {
      setSelectedPlayer(targetPlayer)
    }
  }

  function selectedPlayerStyle(player) {
    return player.id === selectedPlayer ?
      { backgroundColor: 'crimson' } : {}
  }

  const tableFormation = () => {
    let formation = []
      gameSetting.tableFormation.forEach(player => {
      formation.push(
        <div key={player.id}>
           <span 
            id={player.id}
            className="table-formation-player" 
            style={selectedPlayerStyle(player)}
            // DRAG AND DROP ver for PC ver
            // onDragStart={event => event.dataTransfer.setData("player", event.target.id)}
            // onDrop={event => changeTableFormation(event)}
            // onDragOver={event => event.preventDefault()}
            // draggable="true"
            onClick={event => changeTableFormation(event)}
            >
              {player.userName}
          </span>
          <FontAwesomeIcon key={player.id} icon={faArrowCircleRight} />
        </div>
       
      )
    })
    return formation
  }

  return (
    <div className="Gameroom">
      <h4 style={{
        textAlign: 'center'
      }}>
        TITLE: {roomInfo.roomTitle} ROOM_CODE: {roomInfo.roomcode}
      </h4>
      
      <div style={{
        display: 'flex'
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
          {
            isRoomMaster ? 
            <div>
              <input placeholder="# of bullets" type="number"/>
              <select onChange={event => console.log(event.target.value)}>
                <option value="5000">5 sec</option>
                <option value="10000">10 sec</option>
                <option value="15000">15 sec</option>
              </select>
              <div className="table-formation">
                { roomInfo.players.length === roomInfo.numPlayers ?
                    tableFormation() :
                    <p>waiting for players...</p>
                }
              </div>
            </div> :
            ''
          }
          {
            isRoomMaster ?
              <div>
                <button>Start</button>
              </div> :
              ''
          }
        </div>
      </div>
      
      {
        messages.map((msg, i) => {
          return <p key={i}>{ msg }</p>
        })
      }
    </div>
  )
}

export default Gameroom
