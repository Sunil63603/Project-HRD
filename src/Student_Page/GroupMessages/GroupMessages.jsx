//this inturn affect/changes the width of UpdateSection
//useState is because of notifications array[] which fetches new notifications from Database/db.json
//useRef is used to clear the setInterval when theres some error because of notifications server.
import React, { useContext, useState, useEffect, useRef } from "react";
import "./GroupMessages.css";

import { useGlobalContext } from "../../context/GlobalContext";

function GroupMessages() {
  //this global variable is used in polling approach ie.fetching
  const { pollingInterval } = useGlobalContext();

  //logic related to fetching new notifications from Database/db.json
  const [notifications, setNotifications] = useState([]); //initially array is empty.
  const intervalIdRef = useRef(null); //useState updates asynchronously which caused some problem , so useRef()
  // Store interval ID so,that setInterval can be stopped if theres some error while fetching notifications.

  //❌why useState({})? why not [].
  const [expandedNotifications, setExpandedNotifications] = useState({});

  // ❌understand this function clearly.
  //function to toggle between show more.. or show less.. of a notification.
  //receives 'id' of the notification which should be expanded
  const toggleExpand = (id) => {
    setExpandedNotifications((prevState) => ({
      ...prevState, //spread previous state.
      [id]: !prevState[id], //negation
    }));
  };

  //function to fetch notifications from Database/db.json using json-server.
  const fetchNotifications = () => {
    fetch("http://localhost:3000/GroupMessages") //fetching from 'json-server'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setNotifications(data);
        // Log notifications to console
        //❌clear this line once the notifications are successfully displayed on the screen.
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        clearInterval(intervalIdRef.current); // Stop polling if there's an error while fetching notifications
      });
  };

  useEffect(() => {
    //initially fetch notifications , then after some interval keep fetching notifications
    fetchNotifications();

    // Polling every 5 seconds
    const interval = setInterval(fetchNotifications, pollingInterval);
    intervalIdRef.current = interval; // Store interval ID in the ref
    //this statement helps to clear interval(stop fetching) when there's some error while fetching notifications
    //affects performance . WebSockets are used in real-time conversation/messaging applications

    // Cleanup the interval on component unmount,else multiple setIntervals would be running in background🤯
    return () => clearInterval(interval);
  }, []); //useEffect will run only on initial render . But setInterval makes sure fetching logic runs after some constant Interval

  // ❌update this in future to display media along with text in notifications
  return (
    <>
      <div className="update-section full-width">
        <h2 className="component-name">Group-Messages</h2>
        <ul className="notifications-list">
          {/* notifications[] is array which contains each and every notification */}
          {notifications.map((notification) => {
            const isExpanded = expandedNotifications[notification.id]; //❌why are getting 'id',understand this statement clearly
            const shouldTruncate = notification.text.length > 70 && !isExpanded; //message is a 'string'

            //display message is a variable which contains message to be displayed after truncating logic(if message length is more,then show more... will be displayed,else no show more button)
            const displayMessage = shouldTruncate
              ? `${notification.text.slice(0, 70)}...`
              : notification.text;

            return (
              // 'id' is unique , so it is used as key.
              <li key={notification.id} className="notification-item">
                {/* message,date,time,show less/show more button are displayed*/}
                <p className="display-message">{displayMessage}</p>
                <p className="timeStamp">
                  {notification.date} | {notification.time}
                </p>

                {/* Can i use shouldTruncate variable instead of logic in below line */}
                {notification.text.length > 70 && ( //if message is larger that 70 characters , then display show more button
                  // ❌className for button is not descriptive in this case(sometimes its show more , other times it is show less)
                  <button
                    className="show-more-btn"
                    onClick={() => toggleExpand(notification.id)}
                  >
                    {isExpanded ? " show less..." : "...show more "}
                    {/* if already expanded , then display show less button else show more button*/}
                  </button>
                )}
                <hr className="divider"></hr>
                {/* this is used to differentiate two notifications */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default GroupMessages;
