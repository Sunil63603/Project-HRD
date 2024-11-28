import React from "react";
import Navbar from "../Navbar/Navbar"; // imporetd the Navbar component
import { Outlet } from "react-router-dom"; // Outlet component is a placeholders that renders the child component based on the nested route.

const HR_Layout = () => {
  return (
    <>
      <Navbar /> {/* Navbar is displayed always*/}
      <Outlet />
    </>
  );
};

export default HR_Layout;
