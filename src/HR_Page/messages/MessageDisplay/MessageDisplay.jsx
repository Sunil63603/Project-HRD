import React from "react";
import "./MessageDisplay.css";

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div key={index} className={`message-bubble hr-message`}>
          <div className="message-header">
            <span className="sender-name">{"HR"}</span>
            <span className="message-date-time">
              {message.date} {message.time}
            </span>
          </div>
          <div className="message-text">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
