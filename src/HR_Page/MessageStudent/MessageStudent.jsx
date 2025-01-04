import React from "react";
import "./MessageStudent.css";

import { useState, useEffect } from "react";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

import { useGlobalContext } from "../../context/GlobalContext";

import { useLocation } from "react-router-dom";

function MessageStudent() {
  const { pollingInterval } = useGlobalContext();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const studentUSN = queryParams.get("studentUSN");

  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState("");

  useEffect(() => {
    fetchConversationsWithStudent(); //fetch messages initially.

    const intervalId = setInterval(
      fetchConversationsWithStudent,
      pollingInterval
    ); //for every 'pollingInterval' seconds , conversations are being fetched.

    return () => {
      clearInterval(intervalId);
    };
  }, [studentUSN]); //empty dependency[] ensures that this runs only on initial render,but setInterval() is resposible for calling fetch() again and again

  const fetchConversationsWithStudent = async () => {
    try {
      const response = await fetch("http://localhost:3000/registeredStuds");
      if (!response.ok) {
        throw new Error("Failed to fetch registered students array");
      }

      const data = await response.json(); //students[]
      const student = data.find((student) => student.USN === studentUSN);

      if (student) {
        setConversations(student.conversationsWithHR);
      }
    } catch (error) {
      console.error("Error fetching student messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newConversation.trim() === "") {
      PopUpToast.warning("Please enter a valid message!");
      return;
    }

    const newConversationObject = {
      sender: "HR",
      content: newConversation,
      timestamp: new Date().toISOString(),
    };

    //update locally
    setConversations((prevMessages) => [
      ...prevMessages,
      newConversationObject,
    ]);
    setNewConversation("");

    updateConversationsByUSN(studentUSN, newConversationObject);
  };

  //logic to update db.json with new message entered by student
  const updateConversationsByUSN = async (
    studentUSN,
    newConversationObject
  ) => {
    try {
      //fetch the entire registeredStuds[]
      const response = await fetch("http://localhost:3000/registeredStuds");
      const students = await response.json();

      //find the student by USN
      const student = students.find((student) => student.USN === studentUSN);

      if (!student) {
        console.error("Student not found");
        return;
      }

      //update the conversationsWithHR array for specific student
      const updatedStudent = {
        ...student,
        conversationsWithHR: [
          ...student.conversationsWithHR,
          newConversationObject,
        ],
      };

      //update the entire registeredStuds array in db.json
      await fetch(`http://localhost:3000/registeredStuds/${student.id}`, {
        method: "PUT", //replace the entire array
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      //success toast notification
      PopUpToast.success("Message Sent Successfully!");
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Message with {studentUSN}</div>
      <div className="contact-icons">
        <a
          href="https://wa.me/8197759383"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="icon whatsapp-icon" />
        </a>

        <a href="tel:+91 8197759383" target="_blank" rel="noopener noreferrer">
          <FaPhone className="icon phone-icon" />
        </a>

        <a
          href="mailto:s60667843@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="icon mail-icon" />
        </a>
      </div>
      <div className="messages-container">
        {conversations.length > 0 ? (
          conversations.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "HR" ? "HRs-message" : "students-message"
              }`}
            >
              <p>{msg.content}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newConversation}
          onChange={(e) => setNewConversation(e.target.value)}
          className="message-input"
        ></input>
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageStudent;
