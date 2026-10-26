import { FaWhatsapp } from "react-icons/fa";
import "./MessageHRDSection.css"; //Add your styling for messageHRD.
import { useState, useEffect } from "react";
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useGlobalContext } from "../../context/GlobalContext";
import { useLogOut } from "../../context/LogOutContext";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

const MessageHRDSection = () => {
  const { pollingInterval } = useGlobalContext();

  const { user } = useLogOut();
  const studentUSN = user?.USN;
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState("");

  const getConversationsByUSN = async (usn) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${encodeURIComponent(usn)}/messages`,
        { credentials: "include" },
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // fetch conversations by USN only when the component mounts.
  useEffect(() => {
    if (!studentUSN) return;
    // Fetch messages initially
    getConversationsByUSN(studentUSN).then((conversations) => {
      setConversations(conversations);
    });

    // Start polling
    const intervalId = setInterval(() => {
      getConversationsByUSN(studentUSN).then((conversations) => {
        setConversations(conversations);
      });
    }, pollingInterval); // Fetch jobs every 'x' seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [studentUSN, pollingInterval]);

  const handleSendMessage = async () => {
    const content = newConversation.trim();

    if (!content) {
      PopUpToast.warning("Please enter a valid message!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${encodeURIComponent(studentUSN)}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      const message = await response.json();

      setConversations((prev) => [...prev, message]);
      setNewConversation("");
      PopUpToast.success("Message Sent Successfully!");
    } catch (error) {
      console.error(error);
      PopUpToast.error("Failed to send message");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Message HRD</div>
      <div className="contact-icons">
        <a
          href="https://wa.me/8197759383"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="icon whatsapp-icon" />
        </a>

        <a href="tel:+91 8197759383" target="_blank" rel="noopener noreferrer">
          <FaPhoneAlt className="icon phone-icon" />
        </a>

        <a
          href="mailto:s60667843@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGmail className="icon mail-icon" />
        </a>
      </div>
      <hr />
      <div className="messages-container">
        {conversations.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "HR" ? "hr-message" : "student-message"
            }`}
          >
            <p>{msg.content}</p>
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          placeholder="Message HRD"
          value={newConversation}
          onChange={(e) => setNewConversation(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          <div className="arrow-icon">
            <i className="fa-solid fa-arrow-up icons" id="arrow">
              ^
            </i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageHRDSection;
