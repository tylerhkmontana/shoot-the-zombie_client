import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userConnect } from './actions/login.action'
import { updateMessage} from './actions/message.action'
import socketIOClient from 'socket.io-client'
import './App.css';

import Menu from './components/Menu'
import EnterGame from './components/EnterGame'
import Gameroom from './components/Gameroom'
import InGame from './components/InGame'
import Message from './components/Message'
import Gameover from './components/Gameover'

var socket
const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://127.0.0.1:5000'

function App(props) {
  const isLogged = useSelector(state => state.login.isLogged)
  const userName = useSelector(state => state.login.userName)
  const messages = useSelector(state => state.message.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    socket = socketIOClient(ENDPOINT)

    socket.on('user connect', socketId => {
      dispatch(userConnect(socketId))
    })

    socket.on('update message', newMessage => {
      dispatch(updateMessage(newMessage))
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <div className="message-group">
          {
            messages.map((message, i) => <Message key={i} content={message} />)
          }
        </div>
       
        <h1 style={{color: 'crimson'}}>Shoot the zombie</h1>
        {
          isLogged ? <p style={{textAlign: "center", color: "#00ffff", marginBottom: '10px'}}>Logged In: {userName}</p> : ''
        }

        <Route exact path="/" component={EnterGame}/>  
        <Route path="/menu">
          {
            isLogged ? 
              <Menu/> :
              <Redirect to='/' />
          }
        </Route>
        <Route path="/game-room/:roomcode">
          {
            isLogged ? 
              <Gameroom /> :
              <Redirect to='/' />
          }
        </Route>
        <Route path="/in-game">
          {
            isLogged ? 
              <InGame /> :
              <Redirect to='/' />
          }
        </Route>
        <Route path="/gameover/:winner">
          {
            isLogged ? 
              <Gameover /> :
              <Redirect to='/' />
          }
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </div>
    </Router>
  );
}

export { App as default, socket };
