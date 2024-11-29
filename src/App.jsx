import "./App.css";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//vikas components.
import LandingPage from "./Authentication/LandingPage/LandingPage";
import LoginForm from "./Authentication/LoginForm/LoginForm";

//usman components.
import HR_Layout from "./HR_Page/HR_Layout/HR_Layout";
import CreateJobPosting from "./HR_Page/CreateJobPosting/CreateJobPosting";
import CompaniesList from "./HR_Page/CompaniesList/CompaniesList";
import MessageContainer from "./HR_Page/messages/MessagingContainer/MessagingContainer";

//trishan components.
//search functionality is in navbar(ie.usman component)
import Profiles from "./HR_Page/HR_Profiles/HR_Profiles";
import IndividualProfile from "./HR_Page/HR_Profiles/IndividualProfile/IndividualProfile";

//sunil components
import TopFixedBar from "./Student_Page/TopFixedBar/TopFixedBar";
import ProfileSection from "./Student_Page/ProfileSection/ProfileSection";
import JobSection from "./Student_Page/JobSection/JobSection";
import AllProfileSection from "./Student_Page/AllProfilesSection/AllProfileSection";
import UpdateSection from "./Student_Page/UpdateSection/UpdateSection";
import MessageHRDSection from "./Student_Page/MessageHRDSection/MessageHRDSection";
import Student_Layout from "./Student_Page/Student_Layout/Student_Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        {/* <Route path="/hr" element={<Navbar />}></Route>
        <Route path="/hr/create-job" element={<CreateJobPosting />}></Route>
        <Route path="/hr/companies-list" element={<Companies />}></Route>
        <Route
          path="/hr/message-container"
          element={<MessageContainer />}
        ></Route>
<<<<<<< HEAD
      / 
        {/* Individual Student Component 👇 */}
        <Route
          path="/hr/IndividualProfile"
          element={<IndividualProfile />}
        ></Route>
        {/* Profile search container */}
        <Route path="/hr/profile-container" element={<Profiles />}></Route>
        <Route path="/hr/profile-container" element={<Profiles />}></Route>
        <Route path="/hr" element={<HR_Layout />}>
          <Route path="create-job" element={<CreateJobPosting />}></Route>
          <Route path="companies-list" element={<CompaniesList />}></Route>
          <Route
            path="message-container"
            element={<MessageContainer />}
          ></Route>
          <Route path="profile-container" element={<Profiles />}></Route>
        </Route>

        {/*❌This below 👇component must be displayed only when HR clicks on any particular student profile ,  Not while searching */}
        <Route
          path="/hr/profile-container/IndividualProfile"
          element={<IndividualProfile />}
        ></Route>
        {/*❌profiles can be searched in navbar component(ie usman component) */}
        {/* ❌':id' is id of any particular student profile*/}
        {/* <Route path='/hr/profiles/:id' element={<Profile></Profile>}></Route> */}
        <Route path="/student" element={<Student_Layout></Student_Layout>}>
          <Route
            path="profile"
            element={<ProfileSection></ProfileSection>}
          ></Route>
          <Route path="jobs" element={<JobSection></JobSection>}></Route>
          <Route
            path="allprofiles"
            element={<AllProfileSection></AllProfileSection>}
          ></Route>
          <Route
            path="updates"
            element={<UpdateSection></UpdateSection>}
          ></Route>
          <Route
            path="messageHRD"
            element={<MessageHRDSection></MessageHRDSection>}
          ></Route>
          {/*❌This below 👇component must be displayed only when student clicks on any particular student profile ,but Not while searching */}
          {/*❌profiles can be searched in topfixedbar component */}
          {/* ❌':id' is id of any particular student profile*/}
          {/* <Route path='/hr/profiles/:id' element={<Profile></Profile>}></Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
