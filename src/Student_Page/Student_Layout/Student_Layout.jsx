import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";
import { useLogOut } from "../../context/LogOutContext";

function Student_Layout() {
  const { user } = useLogOut();

  useEffect(() => {
    if (!user?.USN) return;

    const storageKey = `lastSeenJobTime_${user.USN}`;

    const checkNewJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs`,
          { cache: "no-store" },
        );

        if (!response.ok) throw new Error("Failed to fetch jobs");

        const jobs = await response.json();

        const latestTime = jobs.reduce(
          (latest, job) =>
            Math.max(latest, new Date(job.timestamp).getTime() || 0),
          0,
        );

        if (!latestTime) return;

        const lastSeen = Number(localStorage.getItem(storageKey) || 0);

        if (lastSeen && latestTime > lastSeen) {
          toast.success("New job posted!");
        }

        if (latestTime > lastSeen) {
          localStorage.setItem(storageKey, String(latestTime));
        }
      } catch (error) {
        console.error("Error checking new jobs:", error);
      }
    };

    checkNewJobs();

    const interval = setInterval(checkNewJobs, 30000);

    return () => clearInterval(interval);
  }, [user?.USN]);

  return (
    <>
      <TopFixedBar user={user}></TopFixedBar>
      <LogOutComponent></LogOutComponent>
      <Outlet className="outlet"></Outlet>
    </>
  );
}

export default Student_Layout;
