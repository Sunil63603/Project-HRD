"use client"; //to store conversations and new text message , we are using react hooks.

import { JSX } from "react";

import { useState } from "react"; //'useState' hook is used to store 'fetched conversations' between student and friend.
//and then to store 'newMessage' entered by current student.(this message should be updated in firebase as well).
import { useEffect } from "react"; //'useEffect' hook is used to 'fetch conversations' bw student and friend from firebase.

import { useSearchParams } from "next/navigation"; //to get friendUSN from the URL.

//import cohortStore for 'pollingInterval' value.
import useCohortStore from "@/store/cohortStore"; //Zustand state management library.

//PopUpToast is used to indicate when message is sent successfully
import PopUpToastProvider from "@/app/components/PopUpToastProvider";

//TS imports,interfaces and type-aliases
interface eachMessageType {
  content: string;
  sender: string;
  timestamp: string;
}

interface frndConversationType {
  messages: eachMessageType[];
  participants: string[];
}

type dropDownType = number | null;

type USNType = string | null;

const MessageFriendClientComp = (): JSX.Element => {
  //get studentUSN from localStorage and friendUSN from URL.
  const searchParams = useSearchParams(); //to get friend USN

  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //'conversations' store existing/previous texts , 'newConversation' will store new Message entered by current student before pushing it to firebase
  const [conversations, setConversations] = useState<eachMessageType[]>([]); //array of existing messages.
  const [newConversation, setNewConversation] = useState<string>(""); //string of new message.
  const [activeDropdown, setActiveDropdown] = useState<dropDownType>(null); //this state variable is used to track which message's dropdown is active.
  //used for delete message functionality

  //Both USNs👇
  const studentUSN: USNType = localStorage.getItem("studentUSN"); //USN of current student profile.
  const friendUSN: USNType = searchParams.get("frndUSN"); //USN of friend . Conversations of current student and friend with these USNs should be rendered on screen.

  //this function is used to toggle the dropdown of messages when user clicks on message.
  const toggleDropdown = (index: dropDownType) => {
    setActiveDropdown((prev: dropDownType) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  const fetchConversationsWithFriend = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`
      );

      if (!response.json) {
        throw new Error("Failed to fetch messages");
      }

      let data = await response.json();
      data = Object.values(data);

      const friendConversations: frndConversationType[] = data || [];

      //Filter the conversation between student and friend.
      const filteredConversations = friendConversations.filter(
        (conversation: frndConversationType) =>
          studentUSN && //make sure these two USNs are not null
          friendUSN &&
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
      );

      setConversations(filteredConversations[0]?.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    try {
      if (newConversation.trim() === "") {
        PopUpToastProvider.warning("Please enter a valid message!");
        return;
      }

      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`
      );

      if (!response.ok) throw new Error("Failed to fetch conversations");

      let data = await response.json();
      data = Object.entries(data || {}); //convert object to array of key-value pairs.

      //find the conversation key where both participants exist
      let [conversationKey, existingConversation] =
        data.find(
          ([_, conversation]: [string, frndConversationType]) =>
            studentUSN &&
            friendUSN &&
            conversation.participants.includes(studentUSN) &&
            conversation.participants.includes(friendUSN)
        ) || [];

      const newMessage = {
        sender: studentUSN,
        content: newConversation,
        timestamp: new Date().toISOString(),
      };

      if (conversationKey) {
        //Append new message to the conversation's messages array
        existingConversation = existingConversation.messages
          ? existingConversation
          : { ...existingConversation, messages: [] }; //if there are no messages,between these two friends,then messages[] in DB is deleted.
        //which causes lots of problems

        existingConversation.messages.push(newMessage);

        //PATCH request to update only this conversation
        await fetch(
          `http://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations/${conversationKey}.json`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: existingConversation.messages }),
          }
        );

        PopUpToastProvider.success("Message sent successfully");
      } else {
        const newConversationObj = {
          participants: [studentUSN, friendUSN],
          messages: [newMessage],
        };

        //use POST to create a new conversation in Firebase.
        await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`,
          {
            method: "POST", //Use POST to let firebase generate a unique key
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newConversationObj),
          }
        );
      }

      setNewConversation(""); //Reset the input field.
      fetchConversationsWithFriend();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDelete = async (index: number): Promise<void> => {
    try {
      //step 1:fetch all friend conversations.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }

      let friendConversations = await response.json(); //'data' is object containing all friend conversations.

      //step 2:Find the conversationKey where both participants match.
      const conversationKey = Object.keys(friendConversations).find((key) => {
        const conversation = friendConversations[key]; //Get the conversation object.
        return (
          conversation.participants.includes(studentUSN) &&
          conversation.participants.includes(friendUSN)
        );
      });

      if (!conversationKey) {
        console.error("Conversation Not found");
        return;
      }

      //step 3:get messages[] from the conversation.
      let updatedMessages: eachMessageType[] =
        friendConversations[conversationKey].messages || [];

      //step 4:remove the message at the given index.
      updatedMessages.splice(index, 1); //remove message at 'index'.

      //if there are no messages,then messages[] will be completely deleted.
      //this creates problem while sending message,because will be no array.

      //step 5:update messages[] in firebase using PATCH
      await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/friendConversations/${conversationKey}.json`,
        {
          method: "PATCH", //use PATCH to delete only this message
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.length == 0 ? [] : updatedMessages,
            //ensures 'messages' always exists.
          }),
        }
      );

      PopUpToastProvider.success("Message deleted successfully!");
      setConversations(updatedMessages); //update local state
    } catch (error) {
      console.error("Error deleting messages:", error);
      PopUpToastProvider.error(
        "Failed to delete the message.Please try again!"
      );
    }
  };

  useEffect(() => {
    fetchConversationsWithFriend(); //fetch messages initally.

    const intervalID = setInterval(
      fetchConversationsWithFriend,
      pollingInterval
    ); //for every 'x' number of seconds,conversations are being fetched.

    return () => {
      clearInterval(intervalID);
    };
  }, []); //dependency array ensures that,this function is called only on initial render,but setInterval will ensure that, for every 'x' number of seconds,conversations are being fetched

  return (
    <>
      <div className="p-4 bg-blue-500 text-white text-center text-lg font-bold">
        Message with {friendUSN}
      </div>
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-2.5">
        {conversations.map((msg: eachMessageType, index: number) => (
          <div
            key={index}
            className={`p-2.5 pr-3.5 rounded-2xl max-w-[70%] break-words relative ${
              msg.sender === friendUSN
                ? "bg-blue-100 self-start text-gray-800"
                : "bg-blue-500 self-end text-white"
            }`}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              toggleDropdown(index);
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              toggleDropdown(index);
            }}
          >
            <p>{msg.content}</p>
            <span className="text-xs text-gray-900 mt-1.5 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>

            {/* Dropdown for delete message functionality */}
            {activeDropdown === index && (
              <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-md z-10 p-2">
                <button
                  className="block w-full text-center px-4 py-2 text-sm text-red-600 font-semibold bg-gray-50 hover:bg-red-100 rounded-md transition duration-200"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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

      <div className="flex p-2.5 bg-white border-t border-gray-300 rounded-2xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={newConversation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewConversation(e.target.value)
          }
          className="flex-1 p-2.5 border border-gray-300 rounded-full outline-none text-base text-black"
        ></input>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleSendMessage()
          }
          className="p-2.5 px-5 ml-2.5 bg-blue-500 text-white border-none rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default MessageFriendClientComp;
