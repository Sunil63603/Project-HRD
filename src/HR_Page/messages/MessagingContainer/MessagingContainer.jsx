import React, { useState, useEffect } from "react";
import "./messaging_container.css";

import MessageDisplay from "../MessageDisplay/MessageDisplay";
import MessageInput from "../MessageInput/MessageInput";

const MessagingContainer = () => {
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from the JSON server
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/GroupMessages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMessages(data); // Set the fetched messages to the state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to post a new message to the JSON server
  const postMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]); // Add the new message to the state
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = (messageText) => {
    // Get current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // e.g., "11/02/2024"
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // e.g., "12:45 PM"

    // Create the new message object with date and time
    const newMessage = {
      sender: "HR",
      text: messageText,
      date: formattedDate,
      time: formattedTime,
    };

    postMessage(newMessage); // Call postMessage function to send it to the server
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="messaging-container">
      <MessageDisplay messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessagingContainer;
