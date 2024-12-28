import React, { useState } from "react";
import { useContext } from "react";
import { useLogOut } from "../../context/LogOutContext";
import { SearchContext } from "../../context/SearchContext";
import "./TopFixedBar.css";

//is used to display component , when user clicks on button
import { useNavigate } from "react-router-dom";

import { PersonCircle } from "react-bootstrap-icons"; // Import the profile icon
//clicking in this 'PersonCircle' will toggle profile's visibility

const TopFixedBar = () => {
  const [activeButton, setActiveButton] = useState("updates"); //this state indicates button which was clicked.

  const { showLogOutContainer } = useLogOut(); //Accessing the context functions
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate(); //initialize navigation function.

  const handleButtonClick = (path, buttonName) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("allprofiles"); //open all profiles as soon as user press 'enter' key
    }
  };

  return (
    <nav className="topFixedBar">
      <div className="topFixedBar-left">
        {/* Left Side: Profile Icon and Project Name */}
        <PersonCircle
          className={`profile-icon ${
            activeButton === "profile" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("/student/profile", "profile")}
        />
        <h1 className="project-name">COHORT</h1>
      </div>
      {/* Search bar at the center */}
      {/* whenever user searches some profile using this input , a component of profile should be displayed. Clicking on that should open entire page */}
      {/* This 'input' should have been inside AllProfiles section,But because of aesthetics , i have placed it here */}
      {/* As soon as user starts typing characters,Allprofiles component should be */}

      <input
        className="topSearchBar"
        placeholder="Search by USN.."
        value={searchTerm}
        onChange={(e) => {
          navigate("allprofiles");
          setSearchTerm(e.target.value);
        }} //update search term dynamically.
        onKeyDown={handleKeyDown} // Trigger functionality on Enter key press
      ></input>

      {/* Update Side: Buttons */}
      <div className="topFixedBar-right">
        <button
          className={`jobs-btn ${activeButton === "jobs" ? "active" : ""}`}
          onClick={() => handleButtonClick("/student/jobs", "jobs")}
        >
          Jobs
        </button>
        <button
          className={`profiles-btn ${
            activeButton === "profiles" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("/student/allprofiles", "profiles")}
        >
          All Profiles
        </button>
        <button
          className={`updates-btn ${
            activeButton === "updates" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("/student/groupMessages", "updates")}
        >
          Group-Messages
        </button>
        <button
          className={`message-hrd-btn ${
            activeButton === "message-hrd" ? "active" : ""
          }`}
          onClick={() =>
            handleButtonClick("/student/messageHRD", "message-hrd")
          }
        >
          Message HRD
        </button>
        <button className="log-out-btn" onClick={showLogOutContainer}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default TopFixedBar;
