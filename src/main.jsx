import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from './context/AuthProvider.jsx'
//import LoginPage from "./LoginPage.jsx"
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
