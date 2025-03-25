import React from "react"; //this is used for strict-mode.
import ReactDOM from "react-dom/client"; //this is for 'createRoot' method.
// import { StrictMode } from "react"; //strict mode is used to find potential errors in the code.(even warnings cannot be ignored in strict mode)
// import { createRoot } from "react-dom/client"; //on this root,react components are rendered.
//index.html ---> main.jsx ---> App.jsx --->AppLayout.jsx
import App from "./App";
import "./index.css";

//❌i think below line is of no use or it has no significance.
const chatbotId = import.meta.env.CHATBOT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
