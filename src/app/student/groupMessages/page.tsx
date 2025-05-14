import React from "react";
import { JSX } from "react";

import GroupMessagesClientComp from "./(groupMessagesClientComp)/groupMessagesClientComp";

function GroupMessages(): JSX.Element {
  return (
    <div className="flex-1 p-8 w-[90%] max-w-[1150px] rounded-2xl bg-blue-400 overflow-y-auto border-1 border-gray-300 shadow-md my-8 mx-auto h-[85vh] overflow-y-auto scroll-smooth scrollbar-w-2 scrollbar-bg-gray-100 scrollbar-thumb-bg-gray-400 scrollbar-thumb-rounded">
      <h2 className="text-2xl italic font-bold mb-5 capitalize text-gray-800 text-center tracking--wide">
        Group Messages
      </h2>
      <GroupMessagesClientComp></GroupMessagesClientComp>
    </div>
  );
}

export default GroupMessages;
