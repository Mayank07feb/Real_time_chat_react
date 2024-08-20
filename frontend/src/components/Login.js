import React, { useState } from 'react';

function Login({ setUsername }) {
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('username', name);
      setUsername(name);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h1>Welcome to Chat</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
