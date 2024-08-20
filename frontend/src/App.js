import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import './App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <div className="app-container">
      <h1>Real-Time Chat Application</h1>
      {username ? <Chat /> : <Login setUsername={setUsername} />}
    </div>
  );
}

export default App;