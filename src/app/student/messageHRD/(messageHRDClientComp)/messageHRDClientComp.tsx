"use client";

import { JSX } from "react";
import { useState } from "react"; //conversations,newConversation,activeDropdown are stored as state variables.
import { useEffect } from "react"; //used to fetch messages from firebase database.
import useCohortStore from "@/store/cohortStore"; //pollingInterval is stored in cohort store.

import { IoMdSend } from "react-icons/io";

import PopUpToastProvider from "@/app/components/PopUpToastProvider"; //to display notifications.

//TS imports,interfaces and type-aliases.
type dropDownType = number | null | undefined;
type USNType = string | null;

import {
  conversationsWithHR,
  registeredStuds,
} from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";

const MessageHRDSectionClientComp = (): JSX.Element => {
  const [conversations, setConversations] = useState<conversationsWithHR[]>([]);
  const [newConversation, setNewConversation] = useState<string>("");

  //this state variable is used to track which message's dropdown is active.
  //used for delete message functionality.
  const [activeDropdown, setActiveDropdown] = useState<dropDownType>();

  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //get studentUSN from localStorage.
  const studentUSN: USNType = localStorage.getItem("studentUSN");

  //to store details of student.
  let studentObj: registeredStuds | {} = {};

  //this function is used to toggle the dropdown of messages when user clicks on message
  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev: dropDownType) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  //handle sending a new message
  const handleSendMessage = (): void => {
    if (newConversation.trim() === "") {
      PopUpToastProvider.warning("Please enter a valid message!");
      return;
    }

    const newConversationObject = {
      sender: "student",
      content: newConversation,
      timestamp: new Date().toISOString(),
    };

    //update locally
    setConversations((prevMessages: conversationsWithHR[]) => [
      ...prevMessages,
      newConversationObject,
    ]);

    setNewConversation("");

    updateConversationsByUSN(studentUSN, newConversationObject); //calling this function to update google firebase.
    getConversationsByUSN(studentUSN);
  };

  const getConversationsByUSN = async (
    studentUSN: USNType
  ): Promise<conversationsWithHR[]> => {
    try {
      //fetch registeredStuds from firebase.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy="USN"&equalTo="${studentUSN}"`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const studentData: registeredStuds | {} = Object.values(data)[0] || {}; //extract students array
      studentObj = studentData;

      return (studentData as registeredStuds).conversationsWithHR || []; //if there are no conversations then return an empty array.
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  //logic to update database with new-message entered by student.
  const updateConversationsByUSN = async (
    studentUSN: USNType,
    newConversationObject: conversationsWithHR
  ): Promise<void> => {
    try {
      //fetch the entire studentObj.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy="USN"&equalTo="${studentUSN}"`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: Record<string, registeredStuds> = await response.json();

      //extract unique key of student which firebase has created.
      const studentKey = Object.keys(data)[0];
      const studentObj: registeredStuds = data[studentKey];

      //ensure conversationsWithHR exists as an array
      if (!studentObj.conversationsWithHR) {
        studentObj.conversationsWithHR = [];
      }

      //add new conversation.
      studentObj.conversationsWithHR.push(newConversationObject);

      //Use PATCH to update only this student's 'conversationsWithHR'
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentKey}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationsWithHR: studentObj.conversationsWithHR,
          }),
        }
      );

      //success toast notification.
      PopUpToastProvider.success("Message sent successfully!");
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

      //step 3:remove message at index.
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

      PopUpToastProvider.success("Message deleted successfully!");
      if (studentData.conversationsWithHR) {
        setConversations(
          studentData.conversationsWithHR.length == 0
            ? []
            : studentData.conversationsWithHR
        ); //update local state
      }

      getConversationsByUSN(studentUSN);
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToastProvider.error(
        "failed to delete the message.Please try again!"
      );
    }
  };

  //fetch conversations by USN only when the component mounts
  useEffect(() => {
    //fetch messages initially
    getConversationsByUSN(studentUSN).then(
      (conversations: conversationsWithHR[]) => {
        setConversations(conversations);
      }
    );

    //start polling
    const intervalID: number = setInterval(() => {
      getConversationsByUSN(studentUSN).then(
        (conversations: conversationsWithHR[]) => {
          setConversations(conversations);
        }
      );
    }, pollingInterval) as unknown as number; //fetch conversations for every 'pollingInterval' seconds

    //cleanup interval on component unmount
    return () => clearInterval(intervalID);
  }, [studentUSN]);

  return (
    <>
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
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-md z-10 p-2">
                  <button
                    className="block w-full text-center px-4 py-2 text-sm text-red-600 font-semibold bg-gray-50 hover:bg-red-100 rounded-md transition duration-200"
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

      <div className="flex p-2.5 bg-white border-t border-gray-300 rounded-4xl text-black">
        <input
          type="text"
          placeholder="Message HRD"
          value={newConversation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewConversation(e.target.value)
          }
          className="flex-1 p-2.5 border border-gray-300 rounded-full outline-none text-base"
        ></input>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleSendMessage()
          }
          className="bg-blue-200 border-none m-2 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700 transform:scale-110"
        >
          <div className="text-xl text-blue cursor-pointer transition-transform duration-200 ease-in-out hover:transform hover:scale-110">
            <i
              className="fa-solid fa-arrow-up flex items-center justify-center text-blue text-lg transition-transform duration-200 ease-in-out"
              id="arrow"
            >
              <IoMdSend></IoMdSend>
            </i>
          </div>
        </button>
      </div>
    </>
  );
};

export default MessageHRDSectionClientComp;
