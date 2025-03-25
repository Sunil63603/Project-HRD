import React, { useState, useEffect } from "react";
// import "./MessageDisplay.css";

import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";
// import { useGlobalContext } from "../../../context/GlobalContext";
//instead of this globalContext , we are using store created by zustand state management library.
import useCohortStore from "../../../store/cohortStore";

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);

  const pollingInterval = useCohortStore((state) => state.pollingInterval);
  // const { pollingInterval } = useGlobalContext();

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which message's dropdown is active

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown for the selected message
  };

  const fetchMessages = async () => {
    try {
      console.log("Hi from fetchMessages function");
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
      //even if all the messages are deleted , FireBase will not delete GroupMessages,because 'GroupMessages' is direct child of root.

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
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
    <div className="p-8 max-h-[420px] overflow-y-auto bg-gray-100 rounded-lg mb-2 shadow-inner flex flex-col gap-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`relative p-3 mb-2 rounded-xl w-full text-sm leading-relaxed break-words ${
            message.sender === "HR"
              ? "bg-blue-100 text-blue-800 self-end"
              : "bg-red-100 text-red-800 self-start"
          } `}
          onClick={() => toggleDropdown(index)}
        >
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span className="font-bold">{"HR"}</span>
            <span className="text-gray-400 text-[10px]">
              {message.date} {message.time}
            </span>
          </div>
          <div className="text=[13px] whitespace-pre-wrap">{message.text}</div>

          {/* Dropdown */}
          {activeDropdown === index && (
            <div className="absolute top-full right-0 mt-1 min-w-[120px] bg-white border border-gray-300 rounded-lg shadow-md z-10 flex flex-col p-1">
              <button
                className="bg-none border-none p-2 text-sm text-gray-700 text-left cursor-pointer hover:bg-gray-200"
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
