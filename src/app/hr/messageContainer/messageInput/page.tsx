import React from "react";

import MessageInputClientComp from "./(messageInputClientComp)/messageInputClientComp";

//'onSend' is function which takes in a string and returns nothing
const MessageInput: React.FC<{ onSend: (messageText: string) => void }> = ({
  onSend,
}) => {
  return <MessageInputClientComp onSend={onSend}></MessageInputClientComp>;
};

export default MessageInput;
