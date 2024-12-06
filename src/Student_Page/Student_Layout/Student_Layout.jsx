import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";

function Student_Layout() {
  return (
    <>
      <TopFixedBar></TopFixedBar>
      {/* Always include this;visibility is handled via LogOutContext */}
      <LogOutComponent></LogOutComponent>
      <Outlet className="outlet"></Outlet>
      {/* Irrespective of the component , student should be notified new job posting (so PopUpToast library) is used in global level */}
    </>
  );
}

export default Student_Layout;
