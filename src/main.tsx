import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <div className="bg-[#2874F0] font-bold text-xl text-white p-3 ">
      <span className="title">FlipTrack</span>-{" "}
      <span className="font-semibold text-base">FlipKart Price Tracker</span>
    </div>
    <App />
  </React.StrictMode>
);
