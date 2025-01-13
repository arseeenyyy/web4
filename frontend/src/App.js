import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import MainPage from './components/Main';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './AuthContext';
import AuthProvider from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/main" element={<PrivateRoute component={MainPage} />} />
          {/* <Route path="/main" element={<MainPage />} /> */}

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
