import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";

function Student_Layout() {
  return (
    <>
      <TopFixedBar></TopFixedBar>
      <Outlet></Outlet>
    </>
  );
}

export default Student_Layout;
