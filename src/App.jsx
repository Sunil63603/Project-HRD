// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Authentication/LandingPage/LandingPage'
import LoginForm from './Authentication/LoginForm/LoginForm';

import Navbar from "./components/navbar/Navbar";
import CreateJobPosting from "./components/create_job_posting/CreateJobPosting";
import CompaniesList from "./components/Companies/companiesList";
import MessagingContainer from "./components/messages/MessagingContainer/MessagingContainer";

function App() {
  return (
    <Router>
      {/* ❌This navbar should be displayed after login.Try to correct this  */}
       <Navbar />

        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/create-job" element={<CreateJobPosting />} />
          <Route path="/companies-list" element={<CompaniesList />} />
          <Route path="/message-container" element={<MessagingContainer />} />
        </Routes>
      
    </Router>
  );
}

export default App;
