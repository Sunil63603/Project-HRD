import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import TopFixedBar from "../TopFixedBar/TopFixedBar";
import LogOutComponent from "../LogOutComponent/LogOutComponent";
import { useLogOut } from "../../context/LogOutContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

function Student_Layout() {
  const { user } = useLogOut();
  const { pathname } = useLocation();

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

          if (pathname !== "/student/jobs") {
            localStorage.setItem(`jobsUnread_${user.USN}`, "true");
            setJobsUnread(true);
          }
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
  }, [user?.USN, pathname]);

  const { pollingInterval } = useGlobalContext();
  const [jobsUnread, setJobsUnread] = useState(false);
  const [groupUnread, setGroupUnread] = useState(false);

  useEffect(() => {
    if (!user?.USN) {
      setGroupUnread(false);
      return;
    }

    const idsKey = `groupMessageIds_${user.USN}`;
    const unreadKey = `groupMessageUnread_${user.USN}`;
    const isGroupPage = pathname === "/student/groupMessages";

    if (isGroupPage) localStorage.removeItem(unreadKey);

    setGroupUnread(!isGroupPage && localStorage.getItem(unreadKey) === "true");

    let active = true;
    let fetching = false;

    const checkGroupMessages = async () => {
      if (fetching) return;
      fetching = true;

      try {
        const response = await fetch(
          "https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages.json",
          { cache: "no-store" },
        );

        if (!response.ok) throw new Error("Failed to fetch group messages");

        const data = await response.json();
        if (!active) return;

        const ids = Object.keys(data || {});
        const previous = localStorage.getItem(idsKey);

        if (previous !== null) {
          const knownIds = new Set(JSON.parse(previous));
          const hasNewMessage = ids.some((id) => !knownIds.has(id));

          if (hasNewMessage) {
            toast.info("New group message!");

            if (!isGroupPage) {
              localStorage.setItem(unreadKey, "true");
              setGroupUnread(true);
            }
          }
        }

        localStorage.setItem(idsKey, JSON.stringify(ids));

        if (isGroupPage) {
          localStorage.removeItem(unreadKey);
          setGroupUnread(false);
        }
      } catch (error) {
        console.error("Group notification error:", error);
      } finally {
        fetching = false;
      }
    };

    checkGroupMessages();

    const interval = setInterval(checkGroupMessages, pollingInterval);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [user?.USN, pathname, pollingInterval]);

  useEffect(() => {
    if (!user?.USN) {
      setJobsUnread(false);
      return;
    }

    const key = `jobsUnread_${user.USN}`;

    if (pathname === "/student/jobs") {
      localStorage.removeItem(key);
      setJobsUnread(false);
    } else {
      setJobsUnread(localStorage.getItem(key) === "true");
    }
  }, [user?.USN, pathname]);

  return (
    <>
      <TopFixedBar
        user={user}
        groupUnread={groupUnread}
        jobsUnread={jobsUnread}
      ></TopFixedBar>
      <LogOutComponent></LogOutComponent>
      <Outlet className="outlet"></Outlet>
    </>
  );
}

export default Student_Layout;
