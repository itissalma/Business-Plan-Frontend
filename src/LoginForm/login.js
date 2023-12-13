// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './login.css'; // Import your CSS file

const LoginForm = () => {
  const [username, setUsername] = useState(''); // Change 'email' to 'username'
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    console.log("Username: " + username);
    
    try {
      //send response as parameters and not body
      const response = await axios.post(`http://localhost:8080/login?username=${username}&password=${password}`, null, { withCredentials: true });
  
      console.log('Login successful!', response.data);
      console.log("status: " + response.status);
      //if response code is 200, then redirect to dashboard
      if(response.status === 200){
        window.location.href = '/dashboard';
        sessionStorage.setItem('username', username);
        //setShowError(true);

      }
      // Handle success (e.g., update state, redirect, etc.)
    } catch (error) {
      console.error('Login failed:', error.message);
      setShowError(true);
      // Handle error (e.g., display an error message to the user)
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      {showError && (
        <div className="error-popup">
          <p>Login failed. Please try again.</p>
          <button onClick={() => setShowError(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
