import "./App.css";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//vikas components.
import LandingPage from "./Authentication/LandingPage/LandingPage";
import LoginForm from "./Authentication/LoginForm/LoginForm";

//usman components.
import Navbar from "./HR_Page/navbar/Navbar";
import CreateJobPosting from "./HR_Page/CreateJobPosting/CreateJobPosting";
import Companies from "./HR_Page/CompaniesList/CompaniesList";
import MessageContainer from "./HR_Page/messages/MessagingContainer/MessagingContainer";

//trishan components.
//search functionality is in navbar(ie.usman component)
import Profiles from "./HR_Page/HR_Profiles/HR_Profiles";

//sunil components
import TopFixedBar from "./Student_Page/TopFixedBar/TopFixedBar";
import ProfileSection from "./Student_Page/ProfileSection/ProfileSection";
import JobSection from "./Student_Page/JobSection/JobSection";
import AllProfileSection from "./Student_Page/AllProfilesSection/AllProfileSection";
import UpdateSection from "./Student_Page/UpdateSection/UpdateSection";
import MessageHRDSection from "./Student_Page/MessageHRDSection/MessageHRDSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>

        <Route path="/hr" element={<Navbar></Navbar>}></Route>
        <Route path="/hr/create-job" element={<CreateJobPosting />}></Route>
        <Route path="/hr/companies-list" element={<Companies />}></Route>
        <Route
          path="/hr/message-container"
          element={<MessageContainer />}
        ></Route>
        <Route path="/hr/profile-container" element={<Profiles />}></Route>
        {/*❌This below 👇component must be displayed only when HR clicks on any particular student profile ,  Not while searching */}
        {/*❌profiles can be searched in navbar component(ie usman component) */}
        {/* ❌':id' is id of any particular student profile*/}
        {/* <Route path='/hr/profiles/:id' element={<Profile></Profile>}></Route> */}

        <Route path="/student" element={<TopFixedBar></TopFixedBar>}></Route>
        <Route
          path="/student/profile"
          element={<ProfileSection></ProfileSection>}
        ></Route>
        <Route path="/student/jobs" element={<JobSection></JobSection>}></Route>
        <Route
          path="/student/allprofiles"
          element={<AllProfileSection></AllProfileSection>}
        ></Route>
        <Route
          path="/student/updates"
          element={<UpdateSection></UpdateSection>}
        ></Route>
        <Route
          path="/student/messageHRD"
          element={<MessageHRDSection></MessageHRDSection>}
        ></Route>
        {/*❌This below 👇component must be displayed only when student clicks on any particular student profile ,but Not while searching */}
        {/*❌profiles can be searched in topfixedbar component */}
        {/* ❌':id' is id of any particular student profile*/}
        {/* <Route path='/hr/profiles/:id' element={<Profile></Profile>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
