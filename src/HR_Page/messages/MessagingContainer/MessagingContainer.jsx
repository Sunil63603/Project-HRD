import React, { useState, useEffect } from "react";
import "./MessagingContainer.css";

import MessageDisplay from "../MessageDisplay/MessageDisplay";
import MessageInput from "../MessageInput/MessageInput";

// import Required for 3rd party Toast Notifications
import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";

const MessagingContainer = () => {
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from the JSON server
  const fetchMessages = async () => {
    // try {
    //   const response = await fetch("http://localhost:3000/GroupMessages", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await response.json();
    //   setMessages(data); // Set the fetched messages to the state
    // } catch (error) {
    //   console.error("Error fetching messages:", error);
    // }

    try {
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
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json(); // Fetch the data from JSONBin
      const messages = data.record.GroupMessages || []; // Extract messages
      setMessages(messages); // Set messages in the state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to post a new message to the JSON server
  const postMessage = async (message) => {
    // try {
    //   const response = await fetch("http://localhost:3000/GroupMessages", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(message),
    //   });
    //   const data = await response.json();
    //   setMessages((prevMessages) => [...prevMessages, data]); // Add the new message to the state
    //   // Success Toast Notificaion
    //   PopUpToast.success("Message Sent Successsully!");
    // } catch (error) {
    //   console.error("Error posting message:", error);
    //   // Error Toast Notificaion
    //   PopUpToast.warning("There is some Error while sending Message!");
    // }

    try {
      // Step 1: Fetch the current GroupMessages object
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9/latest `,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json(); // Get the full data
      const currentMessages = data.record.GroupMessages || []; // Extract current messages

      // Step 2: Add the new message to the existing messages
      const updatedMessages = [...currentMessages, message];

      const updatedData = {
        ...data.record, // Keep other properties intact
        GroupMessages: updatedMessages, // Update only the messages array
      };

      // Step 3: Update JSONBin with the modified GroupMessages object
      const updateResponse = await fetch(
        `https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Error updating data: ${updateResponse.status}`);
      }

      // Update the state and show a success notification
      setMessages(updatedMessages); // Update the state with the new messages
      PopUpToast.success("Message Sent Successfully!");
    } catch (error) {
      console.error("Error posting message:", error);
      PopUpToast.warning("There is some error while sending the message!");
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
      <MessageDisplay messages={messages} fetchMessages={fetchMessages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessagingContainer;
