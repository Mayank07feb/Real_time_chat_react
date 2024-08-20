import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Login from './Login'; // Import the Login component
import '../styles.css'; // Import the CSS

const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const msg = { username, text: message };
      socket.emit('message', msg);
      setMessage('');
    }
  };

  return (
    <div className="App">
      {!username ? (
        <Login setUsername={setUsername} />
      ) : (
        <div className="chatbot-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.username === username ? 'user-message' : 'bot-message'}`}
              >
                <strong>{msg.username}: </strong>{msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
