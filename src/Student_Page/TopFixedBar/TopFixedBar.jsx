import React from "react";
import "./TopFixedBar.css";

import { PersonCircle } from "react-bootstrap-icons"; // Import the profile icon
//clicking in this 'PersonCircle' will toggle profile's visibility


const TopFixedBar = () => {

  return (
    <nav className="topFixedBar">
      <div className="topFixedBar-left">
        {/* Left Side: Profile Icon and Project Name */}
        <PersonCircle
          className="profile-icon"
        />
        <h1 className="project-name">COHORT</h1>
      </div>

      {/* Search bar at the center */}
      <input className="topSearchBar" placeholder="Search Name/USN"></input>

      {/* Update Side: Buttons */}
      <div className="topFixedBar-right">
        <button className="jobs-btn" 
        >Jobs</button>
        <button className="profiles-btn" 
        >
          All Profiles
        </button>
        <button className="updates-btn" 
        >
          Updates
        </button>
        <button className="message-hrd-btn" 
        >Message HRD</button>
        <button className="log-out-btn">Log Out</button>
      </div>
    </nav>
  );
};

export default TopFixedBar;

//❌👆change above logic because now we have used routers