import { useEffect } from "react";
import { usePopUpToastContext } from "../../context/PopUpToastContext";
import { ToastContainer, toast } from "react-toastify"; // Import PopUpToast library
import "react-toastify/dist/ReactToastify.css"; // Import library styles
import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";
import { useGlobalContext } from "../../context/GlobalContext";

function Student_Layout() {
  const { pollingInterval } = useGlobalContext();

  //these two are used for alerting student about new job posting
  const { newJobAlert } = usePopUpToastContext();

  useEffect(() => {
    const lastFetchedTimeStamp = localStorage.getItem("lastFetchedTimestamp");

    const interval = setInterval(async () => {
      console.log("message output from student_Layout");
      const response = await fetch("http://localhost:3000/jobs");
      const jobs = await response.json();

      //check if there's any job with a newer timestamp
      const newJobs = jobs.filter((job) => {
        return new Date(job.timestamp) > new Date(lastFetchedTimeStamp);
      });

      if (newJobs.length > 0) {
        //notify the student of a new job
        toast("New job posted!", { type: "success" });

        //update the lastFetchedTimestamp in localStorage.
        localStorage.setItem(
          "lastFetchedTimestamp",
          newJobs[newJobs.length - 1].timestamp
        );
      }
    }, pollingInterval);

    //clean up on component unmount
    return () => clearInterval(interval);
  }, []);

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
