//createContext is used in VisibilityContext,useContext is used in AppLayout.jsx
import React, { useContext, useState } from "react";
import "./AppLayout.css"; //css for the container.

//components(by default,TopFixedBar,UpdateSection will be displayed).
import TopFixedBar from "./TopFixedBar/TopFixedBar"; //this bar is fixed at top.
import ProfileSection from "./ProfileSection/ProfileSection"; //profile section
import JobSection from './JobSection/JobSection'; //job section
import AllProfileSection from "./AllProfilesSection/AllProfileSection";//all profiles section.
import UpdateSection from "./UpdateSection/UpdateSection"; //updates(notifications)
// ❌import messageHRD component here.

//context
import { VisibilityContext } from "../context/VisibilityContext";
//based on isProfileVisible,conditionally render the profileSection
//based on isAllProfilesVisible,conditinally render the AllProfilesSection.
//....just like that conditionally render components inside AppLayout container

const AppLayout = () => {
  //based on this state variable from VisibilityContext,conditionally render the profileSection
  const { isProfileVisible } = useContext(VisibilityContext);

  //based on this state variable from VisibilityContext, conditionally render the jobSection
  const {isJobsVisible } = useContext(VisibilityContext);

  //based on this state variable from VisibilityContext,conditionally render the AllProfilesSection.
  const { isAllProfilesVisible } = useContext(VisibilityContext);

  //based on this state variable from VisibilityContext,conditinally render the UpdatesSection
  const {isUpdatesVisible} = useContext(VisibilityContext);

  return (
    <>
      <TopFixedBar></TopFixedBar>
      <div className="container">
        {isProfileVisible && <ProfileSection></ProfileSection>}

        {/* out of these below components , one component display will cause other components to disappear*/}
        {isJobsVisible && <JobSection></JobSection>}
        {isAllProfilesVisible && (<AllProfileSection></AllProfileSection>)}
        {isUpdatesVisible && <UpdateSection></UpdateSection>}
        {/* ❌if messageHRD button is clicked , then rendered that component here */}
      </div>
    </>
  );
};

//❌try to implement this logic in future . 
// ❌component that should be rendered in container should be based on route(not based on status/context logic)

export default AppLayout;
