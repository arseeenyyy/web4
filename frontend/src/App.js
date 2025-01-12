import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';


function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [login, setLogin] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/main" element={<Main />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
