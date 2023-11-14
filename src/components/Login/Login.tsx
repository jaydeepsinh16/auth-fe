// src/components/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkToken = async () => {
    if (!!localStorage.getItem('access_token')) {
      navigate('/home');
    }
  };

  useEffect(() => {
    checkToken();
  });

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
  };

  const validatePassword = () => {
    // password is required
    return !!password
  };

  
  const validateEmailAfterError = () => {
    if (emailError) {
        if(validateEmail()) {
            setEmailError('');
        }
    }
  }

  const validatePasswordAfterError = () => {
    if (passwordError) {
        if(validatePassword()) {
            setPasswordError('');
        }
    }
  }



  const handleLogin = async () => {

    // Validate email
    if (!validateEmail()) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!validatePassword()) {
      setPasswordError(
        'Password required'
      );
      return;
    } else {
      setPasswordError('');
    }

    // Make a request to your login API endpoint here
    // Use fetch or your preferred HTTP library

    // Example using fetch
    const response = await fetch('http://127.0.0.1:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });

    if (response.ok) {
			const result = await response.json();
			localStorage.setItem('access_token', result.access_token);
			// Redirect to home page after successful login
			navigate('/home');
    } else {
      // Handle login error
      console.error('Login failed');
      setLoginError('Login Failed ! Invalid Email or Password')
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form>
        <label>
          Email<span className="required">*</span>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}                 
          onKeyDown={e => e.key === 'Enter' ? handleLogin(): validateEmailAfterError()} />
        </label>
        <br />
        {emailError && <p className="error">{emailError}</p>}
        <label>
          Password<span className="required">*</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' ? handleLogin(): validatePasswordAfterError()}/>
        </label>
        <br />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
        {loginError && <p className="error">{loginError}</p>}
      </form>
      <p>
        Don't an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
