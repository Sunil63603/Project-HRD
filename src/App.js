// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './Log/LoginForm';
import Main from './Mainpage/Main';
import Login from './Log/Login';

function App() {

  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login1" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
