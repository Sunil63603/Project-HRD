import "./App.css";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

// import Required for 3rd party Toast Notifications
import { ToastRootContainer } from "./Components/Alert_Message/Alert";

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
    <SearchProvider>
      {/* below (<ToastRootContainer />) Component should be included to render the Tooast Notifcation in the UI */}
      <ToastRootContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>

          <Route path="/hr" element={<HR_Layout />}>
            <Route path="create-job" element={<CreateJobPosting />}></Route>
            <Route path="companies-list" element={<CompaniesList />}></Route>
            <Route
              path="message-container"
              element={<MessageContainer />}
            ></Route>
            <Route path="profile-container" element={<Profiles />}></Route>
            <Route
              path="profile-container/IndividualProfile"
              element={<IndividualProfile />}
            ></Route>
          </Route>

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
            {/* 👇❌This is commented out because there is some issue (many API requests are getting fired off) */}
            {/* <Route
              path="messageHRD"
              element={<MessageHRDSection></MessageHRDSection>}
            ></Route> */}
            {/*❌This below 👇component must be displayed only when student clicks on any particular student profile ,but Not while searching */}
            {/*❌profiles can be searched in topfixedbar component */}
            {/* ❌':id' is id of any particular student profile*/}
          </Route>
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
