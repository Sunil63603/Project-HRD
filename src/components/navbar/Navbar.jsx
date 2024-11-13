import React from "react";
import { Link } from "react-router-dom";
import "./navbar_style.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/create-job" className="navbar-link">
            Create a Job Posting
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/companies-list" className="navbar-link">
            Visiting Companies
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/message-container" className="navbar-link">
            Messages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
