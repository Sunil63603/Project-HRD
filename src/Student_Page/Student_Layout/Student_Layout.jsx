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

  // useEffect(() => {
  //   const lastFetchedTimeStamp = localStorage.getItem("lastFetchedTimestamp");

  //   const interval = setInterval(async () => {
  //     console.log("message output from student_Layout");
  //     const response = await fetch("http://localhost:3000/jobs");
  //     const jobs = await response.json();

  //     //check if there's any job with a newer timestamp
  //     const newJobs = jobs.filter((job) => {
  //       return new Date(job.timestamp) > new Date(lastFetchedTimeStamp);
  //     });

  //     if (newJobs.length > 0) {
  //       //notify the student of a new job
  //       toast("New job posted!", { type: "success" });

  //       //update the lastFetchedTimestamp in localStorage.
  //       localStorage.setItem(
  //         "lastFetchedTimestamp",
  //         newJobs[newJobs.length - 1].timestamp
  //       );
  //     }
  //   }, pollingInterval);

  //   //clean up on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const lastFetchedTimeStamp = localStorage.getItem("lastFetchedTimestamp");

    const interval = setInterval(async () => {
      try {
        console.log("Fetching job updates from JSONBin...");

        const response = await fetch(
          "https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9/latest"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        const jobs = data.record.jobs || [];

        // Check if there's any job with a newer timestamp
        const newJobs = jobs.filter(
          (job) => new Date(job.timestamp) > new Date(lastFetchedTimeStamp)
        );

        if (newJobs.length > 0) {
          // Notify the student of a new job
          toast("New job posted!", { type: "success" });

          // Update the lastFetchedTimestamp in localStorage
          localStorage.setItem(
            "lastFetchedTimestamp",
            newJobs[newJobs.length - 1].timestamp
          );
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }, pollingInterval);

    // Clean up on component unmount
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
