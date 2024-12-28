// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // link is to navigate to the combonent which is described when the user clicks on it and the links/routes/path should be same as described in the App.js
import "./Navbar.css"; // Import the CSS file which has the styling from this component

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  //set the active link based on the current path
  React.useEffect(() => {
    setActiveLink(location.pathName);
  }, [location.pathName]);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li
          className={`navbar-item ${
            activeLink === "/hr/create-job" ? "active" : ""
          }`}
        >
          <Link
            to="/hr/create-job"
            className="navbar-link"
            onClick={() => setActiveLink("/hr/create-job")}
          >
            Create a Job Posting
          </Link>
        </li>
        <li
          className={`navbar-item ${
            activeLink === "/hr/companies-list" ? "active" : ""
          }`}
        >
          <Link
            to="/hr/companies-list"
            className="navbar-link"
            onClick={() => setActiveLink("/hr/companies-list")}
          >
            Visiting Companies
          </Link>
        </li>
        <li
          className={`navbar-item ${
            activeLink === "/hr/message-container" ? "active" : ""
          }`}
        >
          <Link
            to="/hr/message-container"
            className="navbar-link"
            onClick={() => setActiveLink("/hr/message-container")}
          >
            Messages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

//❌include TMG's profiles search bar into this👆 Navbar

export default Navbar;
