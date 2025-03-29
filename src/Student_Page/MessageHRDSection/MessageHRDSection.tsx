//this component is rendered when user clicks on messageHRD button which is present in the topFixedBar.

import React from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "./MessageHRDSection.css"; //Add your styling for messageHRD.
import { useState, useEffect } from "react";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoMdSend } from "react-icons/io";

import useCohortStore from "../../store/cohortStore";

// import { FaArrowUp } from "react-icons/fa";
// import { FiArrowUp } from "react-icons/fi";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>;

//TS imports,interfaces and type-aliases
type USNType = string | null;
type dropDownType = number | null | undefined;
import {
  conversationsWithHR,
  registeredStuds,
} from "../../Authentication/LoginForm/LoginForm";

const MessageHRDSection = (): JSX.Element => {
  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //❌i should get USN of the student from 'URL'(ie.as search params or anything like that)
  //may be like this (/student/:id=1SJ21CS154)
  const studentUSN: USNType = localStorage.getItem("studentUSN"); // this variable is only for testing purpose
  const [conversations, setConversations] = useState<conversationsWithHR[]>([]);
  const [newConversation, setNewConversation] = useState<string>("");

  //this state variable is used to track which message's dropdown is active.
  //used for delete message functionality.
  const [activeDropdown, setActiveDropdown] = useState<dropDownType>();

  //this function is used to toggle the dropdown of messages when user clicks on message
  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev: dropDownType) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  //here write logic to find index of student(1SJ21CS151) inside registeredStuds[].
  //then use that index to fetch conversations of current student
  const getConversationsByUSN = async (
    studentUSN: USNType
  ): Promise<conversationsWithHR[]> => {
    try {
      // Fetch the registered students from JSONBin
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy="USN"&equalTo="${studentUSN}"`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const studentObj: registeredStuds | {} = Object.values(data)[0] || {}; // Extract students array

      return (studentObj as registeredStuds).conversationsWithHR || []; //if there are no conversations then return an empty array.
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  // fetch conversations by USN only when the component mounts.
  useEffect(() => {
    // Fetch messages initially
    getConversationsByUSN(studentUSN).then(
      (conversations: conversationsWithHR[]) => {
        setConversations(conversations);
      }
    );

    // Start polling
    const intervalId: number = setInterval(() => {
      getConversationsByUSN(studentUSN).then(
        (conversations: conversationsWithHR[]) => {
          setConversations(conversations);
        }
      );
    }, pollingInterval); // Fetch conversations every 'pollingInterval' seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [studentUSN]);

  // Handle sending a new message
  const handleSendMessage = (): void => {
    if (newConversation.trim() === "") {
      PopUpToast.warning("Please enter a valid message!");
      return;
    }

    const newConversationObject = {
      sender: "student",
      content: newConversation,
      timestamp: new Date().toISOString(),
    };

    // Update locally
    setConversations((prevMessages: conversationsWithHR[]) => [
      ...prevMessages,
      newConversationObject,
    ]);
    setNewConversation("");

    updateConversationsByUSN(studentUSN, newConversationObject); //calling the function to update google firebase.
    getConversationsByUSN(studentUSN);
  };

  //logic to update db.json with new message entered by student
  const updateConversationsByUSN = async (
    studentUSN: USNType,
    newConversationObject: conversationsWithHR
  ): Promise<void> => {
    try {
      // Fetch the entire JSONBin object
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy="USN"&equalTo="${studentUSN}"`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: Record<string, registeredStuds> = await response.json();

      // Extract the unique key of the student which firebase has created.
      const studentKey = Object.keys(data)[0];
      const studentObj: registeredStuds = data[studentKey];

      // Ensure conversationsWithHR exists as an array
      if (!studentObj.conversationsWithHR) {
        studentObj.conversationsWithHR = [];
      }

      // Add new conversation
      studentObj.conversationsWithHR.push(newConversationObject);

      // ✅ Use PATCH to update only this student’s `conversationsWithHR`
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentKey}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationsWithHR: studentObj.conversationsWithHR,
          }),
        }
      );

      // Success Toast Notification
      PopUpToast.success("Message Sent Successfully!");
      console.log("Messages updated successfully.");
      getConversationsByUSN(studentUSN);
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  };

  const handleDelete = async (index: number): Promise<void> => {
    try {
      //step 1:get student data
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`
      );
      const data = await response.json();

      //step 2:extract student key which is generated by firebase.
      const studentKey = Object.keys(data)[0];
      const studentData: registeredStuds = data[studentKey];

      //step 3:remove message at index
      studentData.conversationsWithHR &&
        studentData.conversationsWithHR.splice(index, 1); //remove message.
      //splice modifies original array(ie.deep copy).While slice creates shallow copy.

      //step 4:update database.
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentKey}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationsWithHR:
              studentData.conversationsWithHR &&
              studentData.conversationsWithHR.length == 0
                ? []
                : studentData.conversationsWithHR,
          }),
        }
      );

      PopUpToast.success("Message deleted successfully!");
      if (studentData.conversationsWithHR) {
        setConversations(
          studentData.conversationsWithHR.length == 0
            ? []
            : studentData.conversationsWithHR
        ); //update local state.
      }

      getConversationsByUSN(studentUSN);
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToast.error("Failed to delete the message.Please try again!");
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-[750px] mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white text-center text-lg font-bold">
        Message HRD
      </div>
      <div className="flex justify-around my-2.5">
        <a
          href="https://wa.me/8197759383"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full text-2xl"
        >
          <FaWhatsapp className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 hover:text-blue-500 text-green-500" />
        </a>

        <a href="tel:+91 8197759383" target="_blank" rel="noopener noreferrer">
          {/* <FaPhone className="icon phone-icon" /> */}
          <FaPhoneAlt className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 hover:text-blue-500 text-green-500" />
        </a>

        <a
          href="mailto:s60667843@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGmail className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 text-red-500" />
        </a>
      </div>
      <hr />
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-2.5">
        {!(conversations.length == 0) ? (
          conversations.map((msg: conversationsWithHR, index: number) => (
            <div
              key={index}
              className={`p-2.5 pr-3.5 rounded-2xl max-w-[70%] break-words relative ${
                msg.sender === "HR"
                  ? "bg-blue-100 self-start text-gray-800"
                  : "bg-blue-500 self-end text-white"
              }`}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                toggleDropdown(index);
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                toggleDropdown(index);
              }}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-gray-900 mt-1.5 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>

              {/* Dropdown for delete message functionality */}
              {activeDropdown === index && (
                <div className="dropdown-menu-HRstudent">
                  <button
                    className="dropdown-item"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No messages found</p>
        )}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          placeholder="Message HRD"
          value={newConversation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewConversation(e.target.value)
          }
          className="flex-1 p-2.5 border border-gray-300 rounded-full outline-none text-base"
        />
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleSendMessage()
          }
          className="bg-blue-200 border-none m-2 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700 transform scale-110"
        >
          <div className="text-xl text-blue cursor-pointer transition-transform duration-200 ease-in-out hover:transform hover:scale-110">
            <i
              className="fa-solid fa-arrow-up flex items-center justify-center text-blue text-lg transition-transform duration-200 ease-in-out"
              id="arrow"
            >
              <IoMdSend />
            </i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageHRDSection;
