import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import MainPage from './components/Main';


function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [login, setLogin] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
