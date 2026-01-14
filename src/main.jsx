import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ===== GLOBAL PRELOADER HANDLER =====
const preloader = document.getElementById("preloader");
const progress = document.getElementById("loader-progress");

let value = 0;
const interval = setInterval(() => {
  value += Math.random() * 20;
  if (value > 100) value = 100;
  
  if (progress) {
    progress.style.width = `${value}%`;
  }

  if (value >= 100) {
    clearInterval(interval);
    
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
      }
    }, 400);
  }
}, 80);

// Force hide after 2 seconds
setTimeout(() => {
  clearInterval(interval);
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
  }
}, 2000);

// ===== RENDER APP =====
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

