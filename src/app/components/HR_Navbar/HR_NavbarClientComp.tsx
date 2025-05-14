"use client"; //we will use this component in layout.tsx file of HR folder.

//useState is used to track current active button in navbar
import React, { useState, useEffect } from "react"; //whenever URL changes,change current active button in navbar , using useEffect hook.
import { usePathname } from "next/navigation"; //usePathName✅, useLocation❌

import Link from "next/link"; //when components are clicked in HR_Navbar, URL needs to change.

import { useLogOut } from "../../../contexts/LogOutContext"; //'showLogOutContainer' function from this context is used to display 'logOutContainer' on the screen.

const HR_Navbar_Client_Comp: React.FC = () => {
  const [activeComponent, setActiveComponent] =
    useState<string>("/hr/create-job");
  const URL: string = usePathname(); //to access current URL , we use pathName.

  //showLogOutContainer function is used to display 'logOutContainer' on the screen.
  const { showLogOutContainer } = useLogOut();

  const handleLogout = () => {
    //❌❌Here use LogOut component of student interface❌❌
    //use same LogOut Component for both HR and student interface.
    showLogOutContainer?.(); //show log out container when user clicks on 'log out' button.
  };

  //set active component based on the current path(only on the client side)
  useEffect(() => {
    if (typeof window !== "undefined")
      //without this i was getting 'hydrating server-rendered HTML' error.
      setActiveComponent(URL);
  }, [URL]); //TS for custom dependency array.

  return (
    <>
      <ul className="flex gap-14 list-none p-0 m-0">
        <li
          className={`transition-transform ${
            activeComponent == "/hr/createJobPosting"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link href="/hr/createJobPosting">Create a Job Posting</Link>
        </li>
        <li
          className={`transition-transform ${
            activeComponent == "/hr/companiesList"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link href="/hr/companiesList">Visiting Companies</Link>
        </li>
        <li
          className={`transition-transform ${
            activeComponent == "/hr/messageContainer"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link href="/hr/messageContainer">Messages</Link>
        </li>
        <li
          className={`transition-transform ${
            activeComponent == "/hr/profilesContainer"
              ? "bg-gray-700 text-white rounded-md p-2 font-bold shadow-md"
              : ""
          }`}
        >
          <Link href="/hr/profilesContainer">Profiles</Link>
        </li>
      </ul>
      <button
        className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-500 shadow-lg transform transition hover:scale-105 hover:cursor-pointer"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  );
};

export default HR_Navbar_Client_Comp;
