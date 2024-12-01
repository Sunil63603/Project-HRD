//this component is rendered when user clicks on messageHRD button which is present in the topFixedBar.

import React from "react";
import "./MessageHRDSection.css"; //Add your styling for messageHRD.
import { useState, useEffect } from "react";

const MessageHRDSection = () => {
  //i should get USN of the student from 'URL'(ie.as search params or anything like that)
  //may be like this (/student/:id=1SJ21CS154)
  const studentUSN = "1SJ21CS151"; //this variable is only for testing purpose
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState("");

  //here write logic to find index of student(1SJ21CS151) inside registeredStuds[].
  //then use that index to fetch conversations of current student
  const getConversationsByUSN = async (studentUSN) => {
    try {
      // Fetch the registeredStuds array from the mock API
      const response = await fetch("http://localhost:3000/registeredStuds");
      const students = await response.json();

      // Find the student by USN
      const student = students.find((stud) => stud.usn === studentUSN);

      // If the student exists, return their conversations
      if (student) {
        return student.conversations;
      } else {
        console.error("Student not found with USN:", usn);
        return [];
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  getConversationsByUSN(studentUSN).then((conversations) => {
    setConversations(conversations);
  });

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newConversation.trim() === "") return;

    const newConversationObject = {
      sender: "student",
      content: newConversation,
      timestamp: new Date().toISOString(),
    };

    // Update locally
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
      // Fetch the entire registeredStuds array
      const response = await fetch("http://localhost:3000/registeredStuds");
      const students = await response.json();

      // Find the student by USN
      const student = students.find((student) => student.usn === studentUSN);

      if (!student) {
        console.error("Student not found");
        return;
      }

      //update the conversations array for specific student
      const updatedStudent = {
        ...student,
        conversations: [...student.conversations, newConversationObject],
      };

      // Update the entire registeredStuds array in db.json
      await fetch(`http://localhost:3000/registeredStuds/${student.id}`, {
        method: "PUT", // Replace the entire array
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });
      console.log("Messages updated successfully.");
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with HR</div>

      <div className="messages-container">
        {conversations.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "HR" ? "hr-message" : "student-message"
            }`}
          >
            <p>{msg.content}</p>
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newConversation}
          onChange={(e) => setNewConversation(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageHRDSection;
