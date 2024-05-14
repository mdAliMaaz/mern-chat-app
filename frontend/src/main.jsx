import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ModelProvider } from "./context/ModelContext.jsx";
import ImagePreviewModel from "./components/model/ImagePreviewModel.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModelProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <ImagePreviewModel />
            <App />
          </SocketContextProvider>
        </AuthContextProvider>
      </ModelProvider>
    </BrowserRouter>
  </React.StrictMode>
);
