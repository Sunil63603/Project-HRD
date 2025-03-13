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

import { useGlobalContext } from "../../context/GlobalContext";

import { useLocation } from "react-router-dom";

const MessageFriend = () => {
  const { pollingInterval } = useGlobalContext();

  //❌❌❌i should get USN of both current student and Friend from 'URL'(ie.as search params or anything like that).
  //may be something like this (/student/1SJ21CS154/friendProfile/:id=1SJ21CS166).

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  //these two variables👇are used for testing purposes only . Later these two USNs will come from URL.
  const studentUSN = localStorage.getItem("studentUSN"); //USN of current student profile.
  const friendUSN = queryParams.get("frndUSN"); // USN of friend . Conversations of current student and friend with these USNs should be rendered on screen.
  // console.log(friendUSN);

  //'conversations' store previous conversations , 'newConversation' will store new message entered by current student before pushing it to db.json
  const [conversations, setConversations] = useState([]); //array of previous messages
  const [newConversation, setNewConversation] = useState(""); //string of new message

  //this state variable is used to track which message's dropdown is active.
  //used for delete message functionality.
  const [activeDropdown, setActiveDropdown] = useState(null);

  //this function is used to toggle the dropdown of messages when user clicks on message.
  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  useEffect(() => {
    fetchConversationsWithFriend(); //fetch messages initially

    const intervalId = setInterval(
      fetchConversationsWithFriend,
      pollingInterval
    ); //for every 'x' number of seconds , conversations are being fetched.
    return () => {
      clearInterval(intervalId);
    };
  }, []); //dependency array ensures that this function is called only on initial render , 'but' setInterval will ensure that for every 'x' number of seconds , conversations are being fetched

  // const fetchConversationsWithFriend = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/friendConversations"); //conversations are fetched from this endpoint.
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }

  //     const data = await response.json();
  //     const filteredConversations = data.filter(
  //       (conversation) =>
  //         conversation.participants.includes(studentUSN) &&
  //         conversation.participants.includes(friendUSN)
  //     );

  //     setConversations(filteredConversations[0].messages);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // const handleSendMessage = async () => {
  //   try {
  //     if (newConversation.trim() === "") {
  //       PopUpToast.warning("Please enter a valid message!");
  //       return;
  //     }

  //     const response = await fetch("http://localhost:3000/friendConversations");
  //     const friendConversations = await response.json();

  //     // Step 2: Find the conversation between the two participants
  //     const existingConversation = friendConversations.find(
  //       (conversation) =>
  //         conversation.participants.includes(studentUSN) &&
  //         conversation.participants.includes(friendUSN)
  //     );

  //     const newMessage = {
  //       sender: studentUSN,
  //       content: newConversation,
  //       timestamp: new Date().toISOString(),
  //     };

  //     if (existingConversation) {
  //       // Step 3: If conversation exists, update the messages array
  //       const updatedConversation = {
  //         ...existingConversation,
  //         messages: [...existingConversation.messages, newMessage], // Append new message
  //       };

  //       // Step 4: Update the specific conversation in the database
  //       await fetch(
  //         `http://localhost:3000/friendConversations/${existingConversation.id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(updatedConversation),
  //         }
  //       );

  //       console.log("Message added to existing conversation.");
  //       PopUpToast.success("Message sent successfully");
  //     } else {
  //       // Step 5: If conversation does not exist, create a new one
  //       const newConversation = {
  //         id: Date.now(), // Generate a unique ID
  //         participants: [studentUSN, friendUSN],
  //         messages: [newMessage], // Initialize with the new message
  //       };

  //       // Step 6: Add the new conversation to the database
  //       await fetch("http://localhost:3000/friendConversations", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newConversation),
  //       });

  //       console.log("New conversation created.");
  //     }
  //     setNewConversation("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  const fetchConversationsWithFriend = async () => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      let data = await response.json();
      data = Object.values(data);
      const friendConversations = data || [];

      console.log(friendConversations);

      // Filter the conversation between student and friend
      const filteredConversations = friendConversations.filter(
        (conversation) =>
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
      );

      setConversations(filteredConversations[0]?.messages || []);
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

      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`
      );

      if (!response.ok) throw new Error("Failed to fetch conversations");

      let data = await response.json();
      data = Object.entries(data || {}); // Convert object to array of key-value pairs

      // Find the conversation key where both participants exist
      let [conversationKey, existingConversation] =
        data.find(
          ([_, conversation]) =>
            conversation.participants.includes(studentUSN) &&
            conversation.participants.includes(friendUSN)
        ) || [];

      console.log(studentUSN, friendUSN);

      const newMessage = {
        sender: studentUSN,
        content: newConversation,
        timestamp: new Date().toISOString(),
      };

      if (conversationKey) {
        // Append new message to the conversation's messages array
        existingConversation = existingConversation.messages
          ? existingConversation
          : { ...existingConversation, messages: [] }; //if there are no messages,between these two friends , then messages[] in DB is deleted.
        //which causes lots of problems.

        existingConversation.messages.push(newMessage);

        // ✅ PATCH request to update only this conversation
        await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations/${conversationKey}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: existingConversation.messages }),
          }
        );

        console.log("Message added to existing conversation.");
        PopUpToast.success("Message sent successfully");
      } else {
        const newConversationObj = {
          participants: [studentUSN, friendUSN],
          messages: [newMessage],
        };

        // ✅ Use POST to create a new conversation in Firebase
        await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`,
          {
            method: "POST", // ✅ Use POST to let Firebase generate a unique key
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newConversationObj),
          }
        );

        console.log("New conversation created.");
      }

      setNewConversation(""); // Reset the input field
      fetchConversationsWithFriend();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      //step 1:fetch all friend Conversations
      const response = await fetch(`
        https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      let friendConversations = await response.json(); //'data' is object containing all friend conversations.
      // friendConversations = Object.values(friendConversations); //this 'data' is array containing all friend conversations.
      //'data' should be in the form of array to use .filter() method

      // const friendConversations = data;
      // console.log(friendConversations);

      //filter the conversation between student and friend.
      // const filteredConversations = friendConversations.filter(
      //   (conversation) =>
      //     conversation.participants.includes(studentUSN) &&
      //     conversation.participants.includes(friendUSN)
      // );

      // const id = filteredConversations[0].id; //get the id of the conversation

      // const conversationKey = Object.keys(data).find(
      //   (key) => data[key].id === id
      // ); //get the firebase key of the conversation.

      //step 2:Find the conversation key where both participants match.
      const conversationKey = Object.keys(friendConversations).find((key) => {
        const conversation = friendConversations[key]; //Get the conversation object.
        return (
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
        );
      });

      if (!conversationKey) {
        console.error("COnversation not found");
        return;
      }

      //step 3:get messages[] from the conversation.
      let updatedMessages = friendConversations[conversationKey].messages || [];

      //step 4:remove the message at the given index
      updatedMessages.splice(index, 1); //remove message at 'index'

      console.log(updatedMessages);

      //if there are no messages,then messages[] will be completely deleted.
      //this creates problem while sending message , because there will be no array.

      //step 5:update messages[] in firebase using PUT.
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations/${conversationKey}.json`,
        {
          method: "PATCH", //use PUT to overwrite array
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.length == 0 ? [] : updatedMessages,
          }), //ensures 'messages' always exists.
        }
      );

      PopUpToast.success("Message deleted successfully!");
      setConversations(updatedMessages); //update local state
    } catch (error) {
      console.error("Error deleting messages:", error);
      PopUpToast.error("Failed to delete the message.Please try again!");
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
            onMouseEnter={() => {
              toggleDropdown(index);
            }}
            onMouseLeave={() => {
              toggleDropdown(index);
            }}
          >
            <p>{msg.content}</p>
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>

            {/* Dropdown for delete message functionality */}
            {activeDropdown === index && (
              <div className="dropdown-menu-friend">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
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
