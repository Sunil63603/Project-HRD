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
    // try {
    //   const response = await fetch("http://localhost:3000/registeredStuds");
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch registered students array");
    //   }

    //   const data = await response.json(); //students[]
    //   const student = data.find((student) => student.USN === studentUSN);

    //   if (student) {
    //     setConversations(student.conversationsWithHR);
    //   }
    // } catch (error) {
    //   console.error("Error fetching student messages:", error);
    // }

    try {
      // Fetch the JSONBin data
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
        throw new Error("Failed to fetch registered students array");
      }

      const data = await response.json(); // Entire JSONBin record
      const registeredStudents = data.record.registeredStuds || []; // Extract the `registeredStuds` array

      // Find the student by their USN
      const student = registeredStudents.find(
        (student) => student.USN === studentUSN
      );

      if (student) {
        // If student is found, update conversations state
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
      // Fetch the entire JSONBin data
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
        throw new Error("Failed to fetch registered students array");
      }

      const data = await response.json(); // Get the entire JSONBin record
      const registeredStudents = data.record.registeredStuds || []; // Extract `registeredStuds` array

      // Find the student by USN
      const student = registeredStudents.find(
        (student) => student.USN === studentUSN
      );

      if (!student) {
        console.error("Student not found");
        return;
      }

      // Add the new conversation directly to the student's `conversationsWithHR` array
      student.conversationsWithHR.push(newConversationObject);

      // Update only the `registeredStuds` property in the JSONBin
      const updateResponse = await fetch(
        `https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data.record, // Preserve other properties in the JSONBin
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update the student's conversation");
      }

      // Success toast notification
      PopUpToast.success("Message Sent Successfully!");
    } catch (error) {
      console.error("Error updating messages:", error);
      PopUpToast.error("Failed to update the conversation!");
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
