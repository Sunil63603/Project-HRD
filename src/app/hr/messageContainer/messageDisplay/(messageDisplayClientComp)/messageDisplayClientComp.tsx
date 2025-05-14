"use client"; //we are using react hooks so,this is a client component.

import React, { useState, useEffect } from "react";
//useState is used to store messages array and it is also used to show 'delete' dropdown for messages

//to display popUp notifications,we import this 'PopUpToastProvider' component.
import PopUpToastProvider from "@/app/components/PopUpToastProvider";

//instead of globalContext,we are using store created by zustand state management library.
import useCohortStore from "@/store/cohortStore";

//TS interfaces
import { Message } from "../../page"; //importing from messageContainer component

const MessageDisplayClientComp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //track which message's dropdown is active.
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  //based on array index,track dropdown

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev: number | null) => (prev === index ? null : index)); //toggle dropdown for the selected message.
  };

  const fetchMessages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages.json`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error!status:${response.status}`);
      }

      const data: Record<string, Message> = await response.json();

      let groupMessagesArray: Message[] = [];
      if (data !== null) {
        //if there are no jobs,then data is empty.
        //convert the fetched data into array of jobs.
        groupMessagesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }

      setMessages(groupMessagesArray);
    } catch (error) {
      //explicit typescripting
      console.error((error as Error).message); //type assertion
    }
  };

  const handleDelete = async (id: string | undefined): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      //even if all the messages are deleted,Firebase will not delete GroupMessages,because 'GroupMessages' is direct child of root.

      if (!response.ok) {
        throw new Error(`HTTP error!status:${response}`);
      }

      PopUpToastProvider.success("Message Deleted Successfully!");
      fetchMessages();
      //updated messages will be fetched because of polling interval. So,dont worry.
    } catch (error) {
      console.error("Error deleting message:", error);
      PopUpToastProvider.error(
        "Failed to delete the message.Please try again!"
      );
    }
  };

  useEffect(() => {
    fetchMessages(); //initial fetch

    const intervalId = setInterval(() => {
      fetchMessages();
    }, pollingInterval);

    return () => clearInterval(intervalId); //clear interval on component unmount
  }, []); //fetch Messages as soon as this component mounts and keep fetching it for latest messages.

  return (
    <>
      <div className="p-8 max-h-[420px] overflow-y-auto bg-gray-100 rounded-lg mb-2 shadow-inner flex flex-col gap-2">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`relative p-3 mb-2 rounded-xl w-full text-sm leading-relaxed break-words ${
              message.sender === "HR"
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-red-100 text-red-800 self-start"
            }`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              toggleDropdown(index)
            }
          >
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span className="font-bold">{"HR"}</span>
              <span className="text-gray-400 text-[10px]">
                {message.date}
                {message.time}
              </span>
            </div>
            <div className="text-[13px] whitespace-pre-wrap">
              {message.text}
            </div>

            {/* Dropdown */}
            {activeDropdown === index && (
              <div className="absolute top-full right-0 mt-1 min-w-[120px] bg-white border border-gray-300 rounded-lg shadow-md z-10 flex flex-col p-1">
                <button
                  className="bg-none border-none p-2 text-sm text-gray-700 text-left cursor-pointer hover:bg-gray-200"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleDelete(message.id)
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageDisplayClientComp;
