// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // link is to navigate to the combonent which is described when the user clicks on it and the links/routes/path should be same as described in the App.js
// import "./Navbar.css"; // Import the CSS file which has the styling from this component

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/hr/create-job");
  const location = useLocation();

  //set the active link based on the current path
  React.useEffect(() => {
    setActiveLink(location.pathName);
  }, [location.pathName]);

  const handleLogout = () => {
    // localStorage.removeItem("authToken"); // Remove auth token
    // sessionStorage.removeItem("authToken"); // If using session storage
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <nav className="flex sticky top-0 justify-between items-center p-4 bg-blue-500 text-white shadow-md rounded-md z-50">
      <ul className="flex gap-14 list-none p-0 m-0">
        <li
          className={`transition-transform ${
            activeLink == "/hr/create-job"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link
            to="/hr/create-job"
            className="text-white no-underline text-base p-2 rounded-md flex justify-center items-center transition-all"
            onClick={() => setActiveLink("/hr/create-job")}
          >
            Create a Job Posting
          </Link>
        </li>
        <li
          className={`transition-transform ${
            activeLink === "/hr/companies-list"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link
            to="/hr/companies-list"
            className="text-white no-underline text-base p-2 rounded-md flex justify-center items-center transition-all"
            onClick={() => setActiveLink("/hr/companies-list")}
          >
            Visiting Companies
          </Link>
        </li>
        <li
          className={`transition-transform ${
            activeLink === "/hr/message-container"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link
            to="/hr/message-container"
            className="text-white no-underline text-base p-2 rounded-md flex justify-center items-center transition-all"
            onClick={() => setActiveLink("/hr/message-container")}
          >
            Messages
          </Link>
        </li>
        <li
          className={`transition-transform ${
            activeLink === "/hr/profile-container"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link
            to="/hr/profile-container"
            className="text-white no-underline text-base p-2 rounded-md flex justify-center items-center transition-all"
            onClick={() => setActiveLink("/hr/profile-container")}
          >
            Profiles
          </Link>
        </li>
      </ul>
      <button
        className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-500 shadow-lg transform transition hover:scale-105"
        onClick={handleLogout}
      >
        Log out
      </button>
    </nav>
  );
};

export default Navbar;
