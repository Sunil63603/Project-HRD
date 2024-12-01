import React, { useEffect } from "react";
import "./Alert.css"; // Import the styling file

export default function Alert({ message, type }) {
  return (
    <div className={`toast-container ${type}`}>
      <span className="toast-message">{message}</span>
      {/* <button className="toast-close" onClick={onClose}>
        &times;
      </button> */}
    </div>
  );
}
