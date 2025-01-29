import React, { useState } from "react";
import "./MessageDisplay.css";

import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";

const MessageDisplay = ({ messages, fetchMessages }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track which message's dropdown is active

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown for the selected message
  };

  const handleDelete = async (idtext) => {
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
      // Step 1: Fetch the current GroupMessages object from JSONBin
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9/latest`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json(); // Get the full data from JSONBin
      const currentMessages = data.record.GroupMessages || []; // Extract the messages array

      // Step 2: Remove the message with the specified ID
      const updatedMessages = currentMessages.filter(
        (message) => message.text !== idtext
      );

      // Step 3: Create an updated GroupMessages object
      const updatedData = {
        ...data.record, // Keep other properties intact
        GroupMessages: updatedMessages, // Update only the messages array
      };

      // Step 4: Update JSONBin with the modified GroupMessages object
      const updateResponse = await fetch(
        `https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Error updating data: ${updateResponse.status}`);
      }

      PopUpToast.success("Message Successfully Deleted!");
      fetchMessages(); // Fetch updated messages after deletion
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToast.error("Failed to delete the message. Please try again!");
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
                onClick={() => handleDelete(message.text)}
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
