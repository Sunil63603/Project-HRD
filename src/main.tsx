import React from "react"; //this is used for strict-mode.
import ReactDOM from "react-dom/client"; //this is for 'createRoot' method.
// import { StrictMode } from "react"; //strict mode is used to find potential errors in the code.(even warnings cannot be ignored in strict mode)
// import { createRoot } from "react-dom/client"; //on this root,react components are rendered.
//index.html ---> main.tsx ---> App.tsx --->AppLayout
import App from "./App";
import "./index.css";

//❌i think below line is of no use or it has no significance.
const chatbotId = import.meta.env.CHATBOT_ID;

//instead of type-assertion,i have written this logic.
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root Element with ID 'root' not found in the DOM");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
