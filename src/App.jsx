// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 👇vikas components
import LandingPage from './Authentication/LandingPage/LandingPage'
import LoginForm from './Authentication/LoginForm/LoginForm';

//👇usman components
import Navbar from "./HR_Page/navbar/Navbar";
import CreateJobPosting from "./HR_Page/create_job_posting/CreateJobPosting";
import CompaniesList from "./HR_Page/companies/CompaniesList";
import MessagingContainer from "./HR_Page/messages/MessagingContainer/MessagingContainer";

//👇Thrishan components
// ❌set routes for TMG components.
import HR_Profiles from "./HR_Page/HR_Profiles/HR_Profiles";

//👇sunil components
import AppLayout from './Student_Page/AppLayout';//appLayout contains left(profile) and right(jobs,all profiles,updates,message) component. 
//context which indicates the components that needs to be rendered in the main container. 
import { VisibilityProvider } from './context/VisibilityContext';



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

        {/* ❌HR_Profiles should be displayed only when displaying HR_Page*/}
        <HR_Profiles></HR_Profiles>

        <VisibilityProvider>
          <AppLayout></AppLayout>
        </VisibilityProvider>
    
    </Router>
  )
}


export default App;
