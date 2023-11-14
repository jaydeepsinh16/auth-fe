// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login/Login';
import Home from './components/Home';
import AuthGuard from './components/AuthGuard';
import './App.css'

const App: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route index element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path="login"  element={<Login />} />
      <Route path="home" element={<AuthGuard component={<Home />} />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
