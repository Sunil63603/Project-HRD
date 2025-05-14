"use client"; //indicates that,this component is a client component.

import { JSX } from "react";

import { useState } from "react"; //used to store 'HR_Messages','show_full_text/expanded_notifications'.
import { useEffect } from "react"; //fetch messages for every 'pollingInterval' number of seconds.
import { useRef } from "react"; //used to reference intervalID variable which is used inside 'useEffect'.
import { MutableRefObject } from "react"; //used to write TS for intervalIDRef.

import useCohortStore from "@/store/cohortStore"; //to get the 'pollingInterval'.

//TS imports,interfaces and type-aliases
import { Message } from "@/app/hr/messageContainer/(messageContainerClientComp)/messageContainerClientComp";
import { Mutable } from "next/dist/client/components/router-reducer/router-reducer-types";
type refType = number | undefined; //used for intervalID.

function GroupMessagesClientComp(): JSX.Element {
  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  //this variable is used to persist even in multiple renders.
  const intervalIDRef = useRef<refType>(null);

  //group-messages are fetched from firebase and are stored here.
  const [gpMessages, setGpMessages] = useState<Message[]>([]);

  //Based on true/false , this logic works.
  const [expandedMessages, setExpandedNotifications] = useState<Message[]>([]);

  //id = unique key generated in firebase.
  const toggleExpand = (id: string) => {
    setExpandedNotifications((prevState: Message[]) => ({
      ...prevState,
      [id]: !prevState[Number(id)], //toggle true/false
    }));
  };

  const fetchMessages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/GroupMessages.json`
      );

      if (!response.json) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      data = Object.values(data);

      const messages: Message[] = data || [];
      setGpMessages(messages);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      if ((intervalIDRef as MutableRefObject<refType>).current) {
        clearInterval((intervalIDRef as MutableRefObject<refType>).current);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(
      fetchMessages,
      pollingInterval
    ) as unknown as number;
    intervalIDRef.current = interval;

    return () => clearInterval(interval);
  }, [pollingInterval]);

  return (
    <>
      <ul className="list-none p-0 m-0 flex flex-col gap-4 scrollbar-w-1.25 scrollbar-thumb-bg-gray-400 scrollbar-thumb-rounded-full">
        {gpMessages.map((message: Message, index: number) => {
          const isExpanded = expandedMessages[Number(message.id)];
          const shouldTruncate = message.text.length > 70 && !isExpanded;
          const displayMessage = shouldTruncate
            ? `${message.text.slice(0, 70)}...`
            : message.text;

          return (
            <li
              key={index}
              className="bg-gray-100 rounded-xl p-4 shadow-md relative overflow-hidden transition-transform duration-200 ease-in-out hover:transform hover:translate-y-[-2px] hover:shadow-lg hover:bg-white hover:text-gray-800"
            >
              <p className="m-0 font-medium text-lg text-gray-700 leading-relaxed transition-colors duration-200 ease-in-out hover:text-black">
                {displayMessage}
              </p>
              <p className="text-sm text-gray-500 mt-2.5 text-right">
                {message.date} | {message.time}
              </p>
              {message.text.length > 70 && (
                <button
                  className="bg-none border-none text-blue-500 cursor-pointer text-base p-1.5 block w-fit transition-colors duration-200 ease-in-out hover:text-blue-700 hover:bg-blue-100 hover:rounded-md"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    message.id && toggleExpand(message.id)
                  }
                >
                  {isExpanded ? "read less" : "...read more"}
                </button>
              )}
              <hr className="border-none border-t border-gray-300 mt-3.75"></hr>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default GroupMessagesClientComp;
