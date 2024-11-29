import React from "react";
import "./TopFixedBar.css";

//is used to display component , when user clicks on button
import { useNavigate } from "react-router-dom";

import { PersonCircle } from "react-bootstrap-icons"; // Import the profile icon
//clicking in this 'PersonCircle' will toggle profile's visibility

const TopFixedBar = () => {
  const navigate = useNavigate(); //initialize navigation function.

  return (
    <nav className="topFixedBar">
      <div className="topFixedBar-left">
        {/* Left Side: Profile Icon and Project Name */}
        <PersonCircle
          className="profile-icon"
          onClick={() => navigate("/student/profile")}
        />
        <h1 className="project-name">COHORT</h1>
      </div>

      {/* Search bar at the center */}
      <input className="topSearchBar" placeholder="Search Name/USN"></input>

      {/* Update Side: Buttons */}
      <div className="topFixedBar-right">
        <button className="jobs-btn" onClick={() => navigate("/student/jobs")}>
          Jobs
        </button>
        <button
          className="profiles-btn"
          onClick={() => navigate("/student/allprofiles")}
        >
          All Profiles
        </button>
        <button
          className="updates-btn"
          onClick={() => navigate("/student/updates")}
        >
          Updates
        </button>
        <button
          className="message-hrd-btn"
          onClick={() => navigate("/student/messageHRD")}
        >
          Message HRD
        </button>
        <button className="log-out-btn">Log Out</button>
      </div>
    </nav>
  );
};

export default TopFixedBar;

//❌👆change above logic because now we have used routers
