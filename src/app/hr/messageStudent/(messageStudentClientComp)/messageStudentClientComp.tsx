"use client"; //this is a client component,in which i have used react hooks.

//'useState' is for conversations,new Conversation,delete dropdown.
import React, { useState, useEffect, JSX } from "react";

//contact details of students are displayed using icons
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

//'studentUSN' is available in URL as searchParameter , so to get that we use this hook.
import { useSearchParams } from "next/navigation";

import PopUpToastProvider from "@/app/components/PopUpToastProvider"; //to display toast notifications.

//this store is used for pollingInterval value
import useCohortStore from "@/store/cohortStore";

//TS interfaces
import {
  conversationsWithHR,
  registeredStuds,
} from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";

function MessageStudentClientComp(): JSX.Element {
  //to get searchParameter ie.studentUSN from URL.
  const searchParams = useSearchParams();
  const studentUSN = searchParams.get("studentUSN");

  const pollingInterval: number = useCohortStore(
    //state is an object which contains pollingInterval property.
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //state variables
  const [conversations, setConversations] = useState<conversationsWithHR[]>([]); //chats between HR and student are fetched and stored inside this state variable.
  const [newConversation, setNewConversation] = useState<string>(""); //when HR types a new text , that would be stored here
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); //this state variable is used to track 'delete' functionality dropdown.
  const [selectedStudent, setSelectedStudent] = useState<registeredStuds | {}>(
    {}
  ); //used to get student's social media details.

  //when user clicks on any message , this function is used toggle the dropdown of messages
  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev: number | null) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  const fetchConversationsWithStudent = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch registered students array");
      }

      const data: registeredStuds[] = await response.json();
      const registeredStudents: registeredStuds[] | [] = data || []; //extract the 'registeredStuds' array.

      //Find the student by their USN.
      const student: registeredStuds | undefined = registeredStudents.find(
        (student: registeredStuds) => student.USN === studentUSN
      ); //find will return 'undefined' when no match is found.

      if (student) {
        //if the student is found,update conversations state.
        setConversations(
          //student.conversationsWithHR might be undefined,and TS cannot guarantee that it is an array.Ensure that it is treated as an array before using it.
          Array.isArray(student.conversationsWithHR)
            ? student.conversationsWithHR.length == 0
              ? []
              : student.conversationsWithHR
            : []
        );
      }
    } catch (error) {
      console.error("Error fetching student messages:", error);
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    if (newConversation.trim() === "") {
      PopUpToastProvider.warning("Please enter a valid message!");
      return;
    }

    const newConversationObject: conversationsWithHR = {
      sender: "HR",
      content: newConversation,
      timestamp: new Date().toISOString(),
    };

    updateConversationsByUSN(studentUSN as string, newConversationObject); //calling this function to update the google firebase.
    setNewConversation("");
    fetchConversationsWithStudent();
  };

  //logic to update google firebase with new message entered by student.
  const updateConversationsByUSN = async (
    studentUSN: string,
    newConversationObject: conversationsWithHR
  ): Promise<void> => {
    try {
      //Fetch all registered students.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data: Record<string, registeredStuds> = await response.json();

      if (Object.keys(data).length == 0) {
        console.error("Student not found");
        return;
      }

      //Extract student ID(unique key in Firebase)
      const studentID: string = Object.keys(data)[0];
      const studentData: registeredStuds = data[studentID];

      //Ensure conversationsWithHR exists as an array.
      const updatedConversations = studentData.conversationsWithHR || [];
      updatedConversations.push(newConversationObject);

      //update only the conversationsWithHR field.
      const updateResponse = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentID}.json`,
        {
          method: "PATCH", //overwrites only the conversationsWithHR field,keeping other data intact
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationsWithHR: updatedConversations }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update conversation");
      }

      PopUpToastProvider.success("Message sent successfully");
      fetchConversationsWithStudent();
    } catch (error) {
      console.error("Error updating messages:", error);
      PopUpToastProvider.error("Failed to update the conversation!");
    }
  };

  const handleDelete = async (index: number): Promise<void> => {
    try {
      //step 1:get student data
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      //step 2:extract student key or firebase unique key.
      const studentKey = Object.keys(data)[0];
      const studentData = data[studentKey];

      //step 3:Remove message at index.
      studentData.conversationsWithHR.splice(index, 1); //remove message.
      //splice modifies original array(ie.deep copy) , while slice creates shallow copy.

      //step 4:update database
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentKey}.json`,
        {
          method: "PATCH", //use PATCH to alter only 'conversationsWithHR' field
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationsWithHR:
              studentData.conversationsWithHR.length == 0
                ? []
                : studentData.conversationsWithHR,
          }), //ensures 'conversationsWithHR[]'
        }
      );

      PopUpToastProvider.success("Message deleted successfully");
      setConversations(
        studentData.conversationsWithHR.length == 0
          ? []
          : studentData.conversationsWithHR
      ); //update local state

      fetchConversationsWithStudent();
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToastProvider.error(
        "Failed to delete the message.Please try again!"
      );
    }
  };

  //this useEffect is used to fetch conversations for every 'pollingInterval' number of seconds
  useEffect(() => {
    fetchConversationsWithStudent(); //fetch messages initially

    const intervalId = setInterval(
      fetchConversationsWithStudent,
      pollingInterval
    );

    return () => {
      clearInterval(intervalId);
    }; //this clean-up function runs when component unmounts.
  }, [studentUSN as string]);

  return (
    <>
      <div className="flex flex-col h-[74vh] w-150 mx-auto mt-4 bg-gray-100 rounded-4xl shadow-md overflow-hidden">
        <div className="p-4 bg-blue-500 text-white text-center text-lg font-bold">
          Message with {studentUSN}
        </div>

        <div className="flex justify-between items-center w-full px-10 py-4 bg-gray-100 border-b border-gray-300">
          <a
            href={`https://wa.m/${
              (selectedStudent as registeredStuds).phoneNumber
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-8 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 text-green-500"></FaWhatsapp>
          </a>

          <a
            href={`tel:${(selectedStudent as registeredStuds).phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPhone className="w-8 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110  text-green-500"></FaPhone>
          </a>

          <a href={`mailto:${(selectedStudent as registeredStuds).email}`}>
            <FaEnvelope className="w-8 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 text-red-500"></FaEnvelope>
          </a>
        </div>

        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-2 text-black">
          {conversations.length > 0 ? (
            conversations.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[70%] break-words relative
            ${
              msg.sender === "HR"
                ? "bg-blue-500 self-end text-white" //HR msgs are towards right-side.
                : "bg-blue-100 self-start text-gray-800" //stud msgs are towards left side.
            }
            `}
                onMouseEnter={() => {
                  toggleDropdown(index);
                }}
                onMouseLeave={() => {
                  toggleDropdown(index);
                }}
              >
                <p>{msg.content}</p>
                <span className="text-xs text-black mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>

                {/* Dropdown for delete message functionality */}
                {activeDropdown === index && (
                  <div className="dropdown-menu-HRstudent">
                    <button
                      className="dropdown-item w-20 bg-red-400 hover:bg-red-500 rounded-4xl"
                      onClick={() => {
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
      </div>
      <div className="w-200 justify-center items-center mx-auto flex p-2 bg-white border border-gray-300 rounded-4xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={newConversation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewConversation(e.target.value)
          }
          className="flex-1 p-2 border border-gray-300 rounded-full outline-gray-500 text-base text-black"
        ></input>
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-full cursor-pointer transition duration-300 hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </>
  );
}

export default MessageStudentClientComp;
