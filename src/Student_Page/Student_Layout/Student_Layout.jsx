import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";

function Student_Layout() {
  return (
    <>
      <TopFixedBar></TopFixedBar>
      {/* Always include this;visibility is handled via context */}
      <LogOutComponent></LogOutComponent>
      <Outlet></Outlet>
    </>
  );
}

export default Student_Layout;
