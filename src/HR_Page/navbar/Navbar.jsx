// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // link is to navigate to the combonent which is described when the user clicks on it and the links/routes/path should be same as described in the App.js
import "./Navbar.css"; // Import the CSS file which has the styling from this component

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/hr/create-job" className="navbar-link">
            Create a Job Posting
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/hr/companies-list" className="navbar-link">
            Visiting Companies
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/hr/message-container" className="navbar-link">
            Messages
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/hr/profile-container" className="navbar-link">
            Profiles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

//❌include TMG's profiles search bar into this👆 Navbar

export default Navbar;
