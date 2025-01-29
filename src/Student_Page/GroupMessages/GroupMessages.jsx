// GroupMessages.jsx
import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import "./GroupMessages.css";

function GroupMessages() {
  const { pollingInterval } = useGlobalContext();
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
        "https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9/latest"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const notifications = data.record.GroupMessages || [];
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
    <div className="update-section full-width">
      <h2 className="component-name">Group Messages</h2>
      <ul className="notifications-list">
        {notifications.map((notification) => {
          const isExpanded = expandedNotifications[notification.id];
          const shouldTruncate = notification.text.length > 70 && !isExpanded;
          const displayMessage = shouldTruncate
            ? `${notification.text.slice(0, 70)}...`
            : notification.text;

          return (
            <li key={notification.id} className="notification-item">
              <p className="display-message">{displayMessage}</p>
              <p className="timeStamp">
                {notification.date} | {notification.time}
              </p>
              {notification.text.length > 70 && (
                <button
                  className="show-more-btn"
                  onClick={() => toggleExpand(notification.id)}
                >
                  {isExpanded ? "Show less..." : "Show more..."}
                </button>
              )}
              <hr className="divider" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupMessages;
