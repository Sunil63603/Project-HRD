//❌❌❌❌❌❌write polling approach to fetch messages between student and friend
//❌❌❌❌❌❌when i messaged 180(vikki),message is not getting updated in db.json

//this component is rendered when user clicks on 'message' button which is present in the Friend's profile.
import React from "react";
import "./MessageFriend.css"; //Add your styling for messageFriend.
//'useState' hook is used to store 'fetched conversations' b/w student and friend ,
//and then to store 'newMessage' entered by current student . (this message should be updated in db.json as well)
//'useEffect' hook is used to 'fetch conversations' b/w student and friend using json-server which is running on port 3000.
import { useState, useEffect } from "react";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
//popUpToast is used to indicate when message is sent successfully.

const MessageFriend = () => {
  //❌❌❌i should get USN of both current student and Friend from 'URL'(ie.as search params or anything like that).
  //may be something like this (/student/1SJ21CS154/friendProfile/:id=1SJ21CS166).

  //these two variables👇are used for testing purposes only . Later these two USNs will come from URL.
  const studentUSN = "1SJ21CS154"; //USN of current student profile.
  const friendUSN = "1SJ21CS166"; // USN of friend . Conversations of current student and friend with these USNs should be rendered on screen.

  //'conversations' store previous conversations , 'newConversation' will store new message entered by current student before pushing it to db.json
  const [conversations, setConversations] = useState([]); //array of previous messages
  const [newConversation, setNewConversation] = useState(""); //string of new message

  useEffect(() => {
    fetchConversationsWithFriend(); //fetch messages initially

    const intervalId = setInterval(fetchConversationsWithFriend, 1000); //for every 'x' number of seconds , conversations are being fetched.
    return () => {
      clearInterval(intervalId);
    };
  }, []); //dependency array ensures that this function is called only on initial render , 'but' setInterval will ensure that for every 'x' number of seconds , conversations are being fetched

  const fetchConversationsWithFriend = async () => {
    try {
      const response = await fetch("http://localhost:3000/friendConversations"); //conversations are fetched from this endpoint.
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      const filteredConversations = data.filter(
        (conversation) =>
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
      );

      setConversations(filteredConversations[0].messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (newConversation.trim() === "") {
        PopUpToast.warning("Please enter a valid message!");
        return;
      }

      const response = await fetch("http://localhost:3000/friendConversations");
      const friendConversations = await response.json();

      // Step 2: Find the conversation between the two participants
      const existingConversation = friendConversations.find(
        (conversation) =>
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
      );

      const newMessage = {
        sender: studentUSN,
        content: newConversation,
        timestamp: new Date().toISOString(),
      };

      if (existingConversation) {
        // Step 3: If conversation exists, update the messages array
        const updatedConversation = {
          ...existingConversation,
          messages: [...existingConversation.messages, newMessage], // Append new message
        };

        // Step 4: Update the specific conversation in the database
        await fetch(
          `http://localhost:3000/friendConversations/${existingConversation.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedConversation),
          }
        );

        console.log("Message added to existing conversation.");
        PopUpToast.success("Message sent successfully");
      } else {
        // Step 5: If conversation does not exist, create a new one
        const newConversation = {
          id: Date.now(), // Generate a unique ID
          participants: [studentUSN, friendUSN],
          messages: [newMessage], // Initialize with the new message
        };

        // Step 6: Add the new conversation to the database
        await fetch("http://localhost:3000/friendConversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newConversation),
        });

        console.log("New conversation created.");
      }
      setNewConversation("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Message with {friendUSN}</div>
      <div className="messages-container">
        {conversations.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === friendUSN ? "friend-message" : "student-message"
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

export default MessageFriend;