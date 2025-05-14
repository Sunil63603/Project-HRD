//this component is rendered when user clicks on 'message' button which is present in the friend's profile.

import React, { JSX } from "react";

import MessageFriendClientComp from "./(messageFriend)/messageFriendClientComp";

//TS imports,type-aliases..etc
type USNType = string | null;

const MessageFriend = (): JSX.Element => {
  return (
    <div className="flex flex-col h-[80vh] w-[600px] mx-auto bg-gray-100 rounded-4xl shadow-md overflow-hidden">
      <MessageFriendClientComp></MessageFriendClientComp>
    </div>
  );
};

export default MessageFriend;
