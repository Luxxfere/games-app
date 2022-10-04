import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from '@reach/router';
import Home from './Home';
import { GameDetails } from './Games';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" /> 
        {/* SOmeone is trying to edit a game */}
        <GameDetails path="/games/:gameId" />
        {/* Someone is trying to add a game */}
        <GameDetails path="/games/new" />
      </Router>
    </div>
  );
}

export default App;
