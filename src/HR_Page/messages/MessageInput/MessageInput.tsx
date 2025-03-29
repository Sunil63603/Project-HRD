import "./MessageInput.css";
import React, { useState } from "react";

// Toast Notification
import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";

const MessageInput: React.FC<{ onSend: (messageText: string) => void }> = ({
  onSend,
}) => {
  const [messageText, setMessageText] = useState<string>("");

  const handleSend = (): void => {
    setMessageText(messageText.trim());

    if (messageText == "") {
      PopUpToast.warning("Please enter a valid message!");
      return;
    }

    if (messageText) {
      onSend(messageText);
      setMessageText("");
    }
  };

  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center p-3 bg-gray-100 rounded-full shadow-lg w-1/2 max-w-2xl"
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          handleSend();
        }
      }}
    >
      <input
        type="text"
        className="flex-1 text-base bg-gray-100 p-5 rounded-full shadow-inner border-none outline-none placeholder-gray-500 italic"
        placeholder="Message..."
        value={messageText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessageText(e.target.value)
        }
      />
      <button
        className="w-55 h-14 p-5 m-3 bg-blue-500 flex items-center justify-center rounded-full shadow-inner border-none outline-none placeholder-gray-500 italic"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          // e.preventDefault();
          handleSend();
        }}
      >
        <strong className="border-solid pt-9 pb-9 p-3 border-white border-1-2 border-b-2  text-white">
          Send
        </strong>
      </button>
    </div>
  );
};

export default MessageInput;
