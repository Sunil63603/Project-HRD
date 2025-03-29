import React, { useState } from "react";
import { useContext } from "react";
import { useLogOut } from "../../context/LogOutContext";
import { useSearchContext } from "../../context/SearchContext";
import "./TopFixedBar.css";

//is used to display component , when user clicks on button
import { useNavigate } from "react-router-dom";

import { PersonCircle } from "react-bootstrap-icons"; // Import the profile icon
//clicking in this 'PersonCircle' will toggle profile's visibility

const TopFixedBar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("updates"); //this state indicates button which was clicked.

  //types of showLogOutContainer,searchTerm,setSearchTerm is defined in their respective context files.
  const { showLogOutContainer } = useLogOut(); //Accessing the context functions
  const { searchTerm, setSearchTerm } = useSearchContext();

  const navigate = useNavigate(); //initialize navigation function.

  const handleButtonClick: (path: string, buttonName: string) => void = (
    path,
    buttonName
  ) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      navigate("allprofiles"); //open all profiles as soon as user press 'enter' key
    }
  };

  return (
    <nav className="flex sticky top-0 justify-between items-center p-4 bg-blue-500 text-white shadow-md rounded-md z-50 mb-5">
      <div className="flex items-center gap-5">
        {/* Left Side: Profile Icon and Project Name */}
        <PersonCircle
          className={`w-10 h-10 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 ease-in-out hover:transform scale-110 border-yellow-400 ${
            activeButton === "profile" ? "active" : ""
          }`}
          onClick={(e: React.MouseEvent<SVGElement>) =>
            handleButtonClick("/student/profile", "profile")
          }
        />
        <h1 className="m-0 text-2xl font-bold">COHORT</h1>
      </div>
      {/* Search bar at the center */}
      {/* whenever user searches some profile using this input , a component of profile should be displayed. Clicking on that should open entire page */}
      {/* This 'input' should have been inside AllProfiles section,But because of aesthetics , i have placed it here */}
      {/* As soon as user starts typing characters,Allprofiles component should be */}

      <input
        className="w-2/5 p-2.5 text-lg rounded-full border border-gray-300 shadow-md outline-none transition-shadow duration-300 ease-in-out focus:border-white text-black  placeholder:text-gray-600 opacity-80"
        placeholder="Search by USN.."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          navigate("allprofiles");
          setSearchTerm(e.target.value);
        }} //update search term dynamically.
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        } // Trigger functionality on Enter key press
      ></input>

      {/* Update Side: Buttons */}
      <div className="flex items-center gap-5">
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform scale-105  hover:shadow-lg transform scale-105 ${
            activeButton === "jobs"
              ? "bg-gray-900 text-white shadow-md bg-gray-900 text-white"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/jobs", "jobs")
          }
        >
          Jobs
        </button>
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform scale-105  ${
            activeButton === "profiles"
              ? "bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/allprofiles", "profiles")
          }
        >
          All Profiles
        </button>
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform scale-105  ${
            activeButton === "updates"
              ? "bg-gray-900 text-white shadow-mdn"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/groupMessages", "updates")
          }
        >
          Group-Messages
        </button>
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform scale-105  ${
            activeButton === "message-hrd"
              ? "bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/messageHRD", "message-hrd")
          }
        >
          Message HRD
        </button>
        <button
          className="bg-red-600 text-white p-2.5 px-5 text-base font-bold rounded-full transition-colors duration-300 ease-in-out hover:bg-red-500 text-red-600 transform scale-105"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            showLogOutContainer
          }
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default TopFixedBar;
