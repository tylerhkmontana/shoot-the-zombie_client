import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css';

import WaitingRoom from './WaitingRoom'
import EnterGame from './EnterGame'

function App() {
  const isLogged = useSelector(state => state.isLogged)
  
  useEffect(() => {
    console.log(document.cookie)
    console.log(isLogged)
  })

  return (
    <Router>
      <div className="App">
        <h1 style={{color: 'crimson'}}>Shoot-the-zombie</h1>

        <Route exact path="/" component={EnterGame}/>  
        <Route path="/waiting-room">
          {
            isLogged ? 
              <WaitingRoom /> :
              <Redirect to='/' />
          }
        </Route>
      </div>
    </Router>
  );
}

export default App;
