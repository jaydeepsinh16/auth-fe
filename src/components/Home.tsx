// src/components/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the access token from localStorage
    localStorage.removeItem('access_token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Application!</p>
      <p className="logout-link" onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
};

export default Home;
