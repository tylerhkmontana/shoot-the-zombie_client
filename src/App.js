import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userConnect } from './actions/loggin.action'
import socketIOClient from 'socket.io-client'
import './App.css';

import Menu from './components/Menu'
import EnterGame from './components/EnterGame'
import Gameroom from './components/Gameroom'

var socket
const ENDPOINT = process.env.ENDPOINT || 'http://127.0.0.1:5000'

function App() {
  const isLogged = useSelector(state => state.login.isLogged)
  const dispatch = useDispatch()
  
  useEffect(() => {
    socket = socketIOClient(ENDPOINT)

    socket.on('user connect', socketId => {
      dispatch(userConnect(socketId))
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <h1 style={{color: 'crimson'}}>Shoot-the-zombie</h1>

        <Route exact path="/" component={EnterGame}/>  
        <Route path="/menu">
          {/* {
            isLogged ? 
              <Menu/> :
              <Redirect to='/' />
          } */}

          <Menu/>
        </Route>
        <Route path="/game-room/:roomcode">
          <Gameroom />
        </Route>
      </div>
    </Router>
  );
}

export { App as default, socket };
