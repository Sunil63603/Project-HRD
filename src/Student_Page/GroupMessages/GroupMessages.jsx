// GroupMessages.jsx
import React, { useState, useEffect, useRef } from "react";

// import { useGlobalContext } from "../../context/GlobalContext";
import useCohortStore from "../../store/cohortStore";

import "./GroupMessages.css";

function GroupMessages() {
  // const { pollingInterval } = useGlobalContext();
  const pollingInterval = useCohortStore((state) => state.pollingInterval);

  const [notifications, setNotifications] = useState([]);
  const [expandedNotifications, setExpandedNotifications] = useState({});
  const intervalIdRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedNotifications((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // const fetchNotifications = () => {
  //   fetch("http://localhost:3000/GroupMessages")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setNotifications(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching notifications:", error);
  //       clearInterval(intervalIdRef.current);
  //     });
  // };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages.json`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      data = Object.values(data);
      const notifications = data || [];
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      clearInterval(intervalIdRef.current);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, pollingInterval);
    intervalIdRef.current = interval;
    return () => clearInterval(interval);
  }, [pollingInterval]);

  return (
    <div className="flex-1 p-8 w-[90%] max-w-[1150px] rounded-2xl bg-blue-400 overflow-y-auto border-1 border-gray-300 shadow-md my-8 mx-auto h-[85vh] overflow-y-auto overflow-auto scroll-smooth scrollbar-w-2 scrollbar-bg-gray-100 scrollbar-thumb-bg-gray-400 scrollbar-thumb-rounded">
      <h2 className="text-2xl italic font-bold mb-5 capitalize text-gray-800 text-center tracking-wide">
        Group Messages
      </h2>
      <ul className="list-none p-0 m-0 flex flex-col gap-4 scrollbar-w-1.25 scrollbar-thumb-bg-gray-400 scrollbar-thumb-rounded-full">
        {notifications.map((notification, index) => {
          const isExpanded = expandedNotifications[notification.id];
          const shouldTruncate = notification.text.length > 70 && !isExpanded;
          const displayMessage = shouldTruncate
            ? `${notification.text.slice(0, 70)}...`
            : notification.text;

          return (
            <li
              key={index}
              className="bg-gray-100 rounded-xl p-4 shadow-md relative overflow-hidden transition-transform duration-200 ease-in-out hover:transform hover:translate-y-[-2px] hover:shadow-lg hover:bg-white hover:text-gray-800"
            >
              <p className="m-0 font-medium text-lg text-gray-700 leading-relaxed transition-colors duration-200 ease-in-out hover:text-black">
                {displayMessage}
              </p>
              <p className="text-sm text-gray-500 mt-2.5 text-right">
                {notification.date} | {notification.time}
              </p>
              {notification.text.length > 70 && (
                <button
                  className="bg-none border-none text-blue-500 cursor-pointer text-base p-1.5 block w-fit transition-colors duration-200 ease-in-out hover:text-blue-700 hover:bg-blue-100 hover:rounded-md"
                  onClick={() => toggleExpand(notification.id)}
                >
                  {isExpanded ? "read less" : "...read more"}
                </button>
              )}
              <hr className="border-none border-t border-gray-300 mt-3.75" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupMessages;
