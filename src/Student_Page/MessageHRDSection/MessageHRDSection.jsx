//this component is rendered when user clicks on messageHRD button which is present in the topFixedBar.

import React from "react";
import "./MessageHRDSection.css"; //Add your styling for messageHRD.
import { useState, useEffect } from "react";

const MessageHRDSection = () => {
  const studentId = "123";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages for the student
  useEffect(() => {
    fetch(`http://localhost:3000/conversations?studentId=${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        const studentConversation = data[0]; // Assuming one conversation per studentId
        setMessages(studentConversation?.messages || []);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [studentId]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObject = {
      sender: "student",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Update locally
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage("");

    // Update db.json
    fetch(`http://localhost:3000/conversations?studentId=${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, newMessageObject],
      }),
    }).catch((error) => console.error("Error updating messages:", error));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with HR</div>

      <div className="messages-container">
        {messages.map((msg, index) => (
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
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
