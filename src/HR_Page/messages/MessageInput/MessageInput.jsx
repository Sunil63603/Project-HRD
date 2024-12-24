import "./MessageInput.css";
import React, { useState } from "react";

// Toast Notification
import PopUpToast from "../../../Global Components/PopUpToast/PopUpToast";

const MessageInput = ({ onSend }) => {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
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
      className="message-input-container"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSend();
        }
      }}
    >
      <input
        type="text"
        className="message-input"
        placeholder="Message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button
        className="send-button"
        onClick={(e) => {
          // e.preventDefault();
          handleSend();
        }}
      >
        <span className="arrow"></span>
      </button>
    </div>
  );
};

export default MessageInput;
