import { StrictMode } from "react"; //strict mode is used to find potential errors in the code.(even warnings cannot be ignored in strict mode)
import { createRoot } from "react-dom/client"; //on this root,react components are rendered.
import App from "./App.jsx"; //index.html ---> main.jsx ---> App.jsx --->AppLayout.jsx

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
