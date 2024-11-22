import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Clear username and password fields when the component mounts
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      const user = users.find(
        (user) => user.name === username && user.password === password
      );

      if (user) {
        alert("Correct, proceed");
        navigate('/dashboard');
      } else {
        alert("Error: Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Error: Unable to verify user");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <div className="login-form">
        <label className="login-label">
          Username*:
          <input
            type="text" required
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="login-label">
          Password*:
          <input
            type="password" required
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="login-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
