import "./message_input.css";
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim()) {
      onSend(messageText);
      setMessageText("");
    }
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button className="send-button" onClick={handleSend}>
        <span class="arrow"></span>
      </button>
    </div>
  );
};

export default MessageInput;
