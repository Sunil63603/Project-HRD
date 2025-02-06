import React, { useState, useEffect } from "react";
import "./MessageDisplay.css";

import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";
import { useGlobalContext } from "../../../context/GlobalContext";

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);
  const { pollingInterval } = useGlobalContext();

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which message's dropdown is active

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown for the selected message
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages.json`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let groupMessagesArray = [];
      if (data !== null) {
        //if there are no jobs , then data is empty.
        //convert the fetched data into array of jobs
        groupMessagesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }

      setMessages(groupMessagesArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    // console.log("Delete clicked for message:", id);

    // Implement delete functionality
    // try {
    //   const response = await fetch(
    //     `http://localhost:3000/GroupMessages/${id}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   PopUpToast.success("Message Successfully Deleted!");
    //   // console.log("DELETED");
    //   fetchMessages(); // Fetch updated messages after deletion
    // } catch (error) {
    //   console.error();
    //   PopUpToast.error(error);
    // }

    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response})`);
      }

      PopUpToast.success("Message Successfully Deleted!");
      fetchMessages();
      //updated messages will be fetched because of polling interval so , dont worry .
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToast.error("Failed to delete the message. Please try again!");
    }
  };

  useEffect(() => {
    fetchMessages(); //initial fetch

    const intervalId = setInterval(() => {
      fetchMessages();
    }, pollingInterval);

    return () => clearInterval(intervalId); //clear interval on component unmount.
  }, []); //fetch Messages as soon as this component mounts and keep fetching it for latest messages.

  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div
          key={index}
          className="message-bubble hr-message"
          onClick={() => toggleDropdown(index)}
        >
          <div className="message-header">
            <span className="sender-name">{"HR"}</span>
            <span className="message-date-time">
              {message.date} {message.time}
            </span>
          </div>
          <div className="message-text">{message.text}</div>

          {/* Dropdown */}
          {activeDropdown === index && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleDelete(message.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
