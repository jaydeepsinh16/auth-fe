// src/components/Signup.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fNameError, setfNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
  };

  const validatePassword = () => {
    // Minimum length of 8 characters
    const hasValidLength = password.length >= 8;
    // Contains at least 1 letter, 1 number, and 1 special character
    const hasValidCharacters = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(password);

    return hasValidLength && hasValidCharacters;
  };

  const validateEmailAfterError = () => {
    if (emailError) {
        if(validateEmail()) {
            setEmailError('');
        }
    }
  }

  const validateFirstName = () => {
    return !!firstName
  }

  const validatePasswordAfterError = () => {
    if (passwordError) {
        if(validatePassword()) {
            setPasswordError('');
        }
    }
  }

  const handleSignup = async () => {
    // Validate email
    if (!validateEmail()) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validateFirstName()) {
        setfNameError('Please enter First Name')
    }

    // Validate password
    if (!validatePassword()) {
      setPasswordError(
        'Password must be at least 8 characters long and include at least 1 letter, 1 number, and 1 special character.'
      );
      return;
    } else {
      setPasswordError('');
    }

    // Make a request to your signup API endpoint here
    // Use fetch or your preferred HTTP library

    // Example using fetch
    const response = await fetch('http://127.0.0.1:3001/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email: username, password }),
    });

    if (response.ok) {
      setSuccessMsg('User Registered Successfully ! Please Login Now')
      setTimeout(() => {
        // Redirect to login page after successful signup
        navigate('/login');
      }, 3000)
    } else {
      // Handle signup error
      console.error('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
      <label>
          First Name<span className="required">*</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSignup() : '')}
          />
        </label>
        <br />
        {fNameError && <p className="error">{fNameError}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSignup() : '')}
          />
        </label>
        <br />

        <label>
          Email<span className="required">*</span>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSignup() : validateEmailAfterError())}
          />
        </label>
        <br />
        {emailError && <p className="error">{emailError}</p>}
        <label>
          Password<span className="required">*</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSignup() : validatePasswordAfterError())}
          />
        </label>
        <br />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
        {successMsg && <p className="success">{successMsg}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
