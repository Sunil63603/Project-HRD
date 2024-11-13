import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import CreateJobPosting from "./components/create_job_posting/CreateJobPosting";

import CompaniesList from "./components/Companies/companiesList";

import MessagingContainer from "./components/messages/MessagingContainer/MessagingContainer";

const App = () => {
  return (
    // <CreateJobPosting />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create-job" element={<CreateJobPosting />} />
        <Route path="/companies-list" element={<CompaniesList />} />
        <Route path="/message-container" element={<MessagingContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
