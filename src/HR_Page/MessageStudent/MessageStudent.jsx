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
    if (!studentUSN) return;

    fetchConversationsWithStudent();

    const intervalId = setInterval(
      fetchConversationsWithStudent,
      pollingInterval,
    );

    return () => clearInterval(intervalId);
  }, [studentUSN, pollingInterval]);

  const fetchConversationsWithStudent = async () => {
    if (!studentUSN) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${encodeURIComponent(studentUSN)}/messages`,
        { credentials: "include" },
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching student messages:", error);
    }
  };

  const handleSendMessage = async () => {
    const content = newConversation.trim();

    if (!content || !studentUSN) {
      PopUpToast.warning("Please enter a valid message!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${encodeURIComponent(studentUSN)}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      const message = await response.json();

      setConversations((prev) => [...prev, message]);
      setNewConversation("");

      PopUpToast.success("Message Sent Successfully!");
    } catch (error) {
      console.error(error);
      PopUpToast.error("Failed to send message");
    }
  };

  //logic to update google firebase with new message entered by student
  const updateConversationsByUSN = async (
    studentUSN,
    newConversationObject,
  ) => {
    try {
      // Fetch all registered students
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();

      if (Object.keys(data).length === 0) {
        console.error("Student not found");
        return;
      }

      // Extract student ID (unique key in Firebase)
      const studentId = Object.keys(data)[0];
      const studentData = data[studentId];

      // Ensure conversationsWithHR exists as an array
      const updatedConversations = studentData.conversationsWithHR || [];
      updatedConversations.push(newConversationObject);

      // Update only the conversationsWithHR field
      const updateResponse = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds/${studentId}/conversationsWithHR.json`,
        {
          method: "PUT", // Overwrites only the conversationsWithHR field, keeping other data intact
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedConversations),
        },
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update conversation");
      }

      console.log("Conversation updated successfully!");
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
