// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "../../context/LogOutContext";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const { logout } = useLogOut();
  const navigate = useNavigate();

  //set the active link based on the current path
  React.useEffect(() => {
    setActiveLink(location.pathName);
  }, [location.pathName]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert("Logout failed");
    }
  };

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
        <li
          className={`navbar-item ${
            activeLink === "/hr/profile-container" ? "active" : ""
          }`}
        >
          <Link
            to="/hr/profile-container"
            className="navbar-link"
            onClick={() => setActiveLink("/hr/profile-container")}
          >
            Profiles
          </Link>
        </li>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
