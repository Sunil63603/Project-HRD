import { useEffect } from "react";
import { usePopUpToastContext } from "../../context/PopUpToastContext";
import { ToastContainer, toast } from "react-toastify"; // Import PopUpToast library
import "react-toastify/dist/ReactToastify.css"; // Import library styles
import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";

import useCohortStore from "../../store/cohortStore";
// import { useGlobalContext } from "../../context/GlobalContext";

function Student_Layout() {
  const pollingInterval = useCohortStore((state) => state.pollingInterval);
  // const { pollingInterval } = useGlobalContext();

  return (
    <>
      <TopFixedBar></TopFixedBar>
      {/* Always include this;visibility is handled via LogOutContext */}
      <LogOutComponent></LogOutComponent>
      <Outlet className="outlet"></Outlet>
      {/* Irrespective of the component , student should be notified new job posting (so PopUpToast library) is used in global level */}
      <ToastContainer position="top-right" autoClose={10000} />{" "}
      {/* Required to display the notification */}
    </>
  );
}

export default Student_Layout;
