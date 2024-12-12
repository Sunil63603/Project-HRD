import React from "react";
import Navbar from "../navbar/Navbar"; // imporetd the Navbar component
import { Outlet } from "react-router-dom"; // Outlet component is a placeholders that renders the child component based on the nested route.

const HR_Layout = () => {
  return (
    <>
      {/* Navbar is displayed always*/}
      {/* The Navbar contains 4 child components,which ever component btn is clicked (in Navbar) that particular path is displayed in URL bar.*/}
      {/* The URL bar triggers the Routes and that particular path component is displyed in the UI */}
      <Navbar />
      {/* The use of outlet is to trigger the child components */}
      {/* The child components means the Route (component) contains the sub-Route (component)*/}
      {/* In this we have the (HR_Layout) as the parent component and the (Navbar and 4 components)are the child components which is passed as the prop in the Outlet */}
      <Outlet />
    </>
  );
};

export default HR_Layout;
