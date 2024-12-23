import React, { useState } from "react";
import "./MessageDisplay.css";

import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";

const MessageDisplay = ({ messages, fetchMessages }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which message's dropdown is active

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown for the selected message
  };

  const handleDelete = async (id) => {
    // console.log("Delete clicked for message:", id);

    // Implement delete functionality
    try {
      const response = await fetch(
        `http://localhost:3000/GroupMessages/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      PopUpToast.success("Message Successfully Deleted!");
      // console.log("DELETED");
      fetchMessages(); // Fetch updated messages after deletion
    } catch (error) {
      console.error();
      PopUpToast.error(error);
    }
  };

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
