// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './Authentication/LandingPage/LandingPage'
import LoginForm from './Authentication/LoginForm/LoginForm';

function App() {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
