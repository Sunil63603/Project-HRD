//this component is rendered when user clicks on 'All-Profiles' button which is present in the Stud_Navbar.
//or when user starts typing USN in search bar in Stud_Navbar.

import React, { JSX } from "react";
import AllProfileSectionClientComp from "./allProfilesClientComp/allProfilesClientComp";

//React.FC indicates that 'AllProfileSection' is a react functional component.
//JSX.Element indicates that 'AllProfileSection' returns JSX element.
const AllProfileSection: React.FC = (): JSX.Element => {
  return (
    <div className="flex-2 p-5 my-auto mx-auto bg-gray-200 rounded-2xl w-[1150px] h-[70vh] overflow-y-scroll border-1 border-gray-300 shadow-lg">
      <h2 className="text-4xl italic font-medium mb-4 capitalize text-black flex items-center justify-center">
        All Profiles
      </h2>
      <AllProfileSectionClientComp></AllProfileSectionClientComp>
    </div>
  );
};

export default AllProfileSection;
