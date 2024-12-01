import "./message_input.css";
import React, { useState } from "react";

// Toast Notification
import PopUpToast from "../../../Components/Alert_Message/Alert";

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
    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button className="send-button" onClick={handleSend}>
        <span className="arrow"></span>
      </button>
    </div>
  );
};

export default MessageInput;
