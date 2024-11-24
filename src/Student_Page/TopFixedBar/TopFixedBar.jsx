//useContext is used for contextVisibility.
import React, { useContext } from "react";
import "./TopFixedBar.css";

import { PersonCircle } from "react-bootstrap-icons"; // Import the profile icon
//clicking in this 'PersonCircle' will toggle profile's visibility

//context
import { VisibilityContext } from "../../context/VisibilityContext"; //profile visibility,All profiles' section visibilty,updateSection visibility

const TopFixedBar = () => {
  //destructing the toggleProfileVisibilty function from the VisibilityContext.
  const { toggleProfileVisibility } = useContext(VisibilityContext);

  //destructing the toggleJobsVisibility function from the VisibilityContext
  const { toggleJobsVisibility } = useContext(VisibilityContext);

  //destructing the toggleAllProfilesVisibilty function from the VisibilityContext.
  const { toggleAllProfilesVisibility } = useContext(VisibilityContext);

  //destructing the toggleUpdatesVisibility function from the VisibilityContext
  const { toggleUpdatesVisibility } = useContext(VisibilityContext);

  return (
    <nav className="topFixedBar">
      <div className="topFixedBar-left">
        {/* Left Side: Profile Icon and Project Name */}
        <PersonCircle
          className="profile-icon"
          onClick={toggleProfileVisibility}
        />
        {/*clicking on this icon should toggle the visibilty of the profileSection*/}
        <h1 className="project-name">COHORT</h1>
      </div>

      {/* Search bar at the center */}
      <input className="topSearchBar" placeholder="Search Name/USN"></input>

      {/* Update Side: Buttons */}
      <div className="topFixedBar-right">
        <button className="jobs-btn" onClick={toggleJobsVisibility}>Jobs</button>
        {/* clicking on updates button , which toggle its visibility status(ie true to false and vice versa) */}
        <button className="profiles-btn" onClick={toggleAllProfilesVisibility}>
          All Profiles
        </button>
        <button className="updates-btn" onClick={toggleUpdatesVisibility}>
          Updates
        </button>
        <button className="message-hrd-btn">Message HRD</button>
        <button className="log-out-btn">Log Out</button>
      </div>
    </nav>
  );
};

export default TopFixedBar;
