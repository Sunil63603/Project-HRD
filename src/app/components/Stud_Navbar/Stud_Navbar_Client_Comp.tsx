"use client"; //here we are using state react hook .So, this is client component.

import React, { useState } from "react"; //useState is to indicate active component by highlighting button in NavBar.
import { PersonCircle } from "react-bootstrap-icons"; //Importing the profile icon
//clicking on this 'PersonCircle' will toggle profile's visibility.

//this is used to display component,when user clicks on button
import { useRouter } from "next/navigation";

import { useSearchContext } from "@/contexts/SearchContext"; //this is a custom context , used to filter friend profiles based on 'searchTerm'.
import { useLogOut } from "../../../contexts/LogOutContext"; //here i am using same 'logOutContext' for both HR and student,does this cause any issue.

const Stud_Navbar_Client_Comp: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>(
    "/student/studProfile"
  ); //this state indicates button which is clicked.

  //initialize router funtion for navigation when student clicks on buttons in Navbar.
  const router = useRouter();

  const { searchTerm, setSearchTerm } = useSearchContext(); //based on this 'searchTerm', friend profiles are filtered in all-profiles.
  //type of showLogOutContainer,searchTerm,setSearchTerm is defined in their respective context files.
  const { showLogOutContainer } = useLogOut(); //Accessing context functions

  const handleButtonClick: (path: string, buttonName: string) => void = (
    path,
    buttonName
  ) => {
    setActiveComponent(buttonName);
    router.push(path);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      router.push("/student/allProfiles"); //open all profiles as soon as user press 'enter' key when he has entered some 'searchTerm'
    }
  };

  return (
    <>
      <div className="flex items-center gap-5">
        {/* Left side:Profile Icon */}
        <PersonCircle
          className={`w-10 h-10 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 ease-in-out hover:transform scale-110 border-yellow-400 ${
            activeComponent === "/student/profile"
              ? " bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<SVGElement>) =>
            handleButtonClick("/student/studProfile", "/student/profile")
          }
        ></PersonCircle>
        <h1 className="m-0 text-2xl font-bold">COHORT</h1>
      </div>

      {/* search bar at the center */}
      {/* whenever user searches some profile using this input, a component 'allProfiles' should be displayed.Clicking on any one profile , should open entire new page */}
      {/* This 'input' should have been inside Allprofiles section,But because of 'aesthetics', i have placed here. */}
      {/* As soon as user starts typing characters,Allprofiles component should be rendered/displayed on the screen */}
      <input
        className="w-2/5 p-2.5 text-lg rounded-full bg-gray-100 border border-gray-300 shadow-md outline-none transition-shadow duration-300 ease-in-out focus:border-white text-black placeholder:text-gray-600 opacity-80"
        placeholder="Search by USN"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          router.push("/student/allProfiles");
          setSearchTerm(e.target.value);
        }} //update search term dynamically.
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
        //Triggers functionality on 'Enter' key press.
      ></input>

      {/* right-side buttons */}
      <div className="flex items-center gap-5">
        <button
          className={`bg-blue-500 border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform:scale-105 hover:shadow-lg ${
            activeComponent === "/student/jobs"
              ? " bg-gray-900 text-white shadow-md bg-gray-900"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/jobs", "/student/jobs")
          }
        >
          Jobs
        </button>
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform:scale-105 ${
            activeComponent === "/student/allProfiles"
              ? " bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/allProfiles", "/student/allProfiles")
          }
        >
          All Profiles
        </button>
        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform:scale-105 ${
            activeComponent === "/student/groupMessages"
              ? " bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick(
              "/student/groupMessages",
              "/student/groupMessages"
            )
          }
        >
          Group-Messages
        </button>

        <button
          className={`bg-blue-500 text-white border-none p-2.5 text-base font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-900 transform:scale-105 ${
            activeComponent === "/student/messageHRD"
              ? "bg-gray-900 text-white shadow-md"
              : ""
          }`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleButtonClick("/student/messageHRD", "/student/messageHRD")
          }
        >
          Message HRD
        </button>
        <button
          className="bg-red-600 text-white p-2.5 px-5 text-base font-bold rounded-full transition-colors duration-300 ease-in-out hover:bg-red-500 text-red-600 transform:scale-105"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            showLogOutContainer && showLogOutContainer()
          }
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Stud_Navbar_Client_Comp;
