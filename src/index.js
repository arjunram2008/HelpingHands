import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginSignup from "./LoginSignup/LoginSignup";
import About from "./About/About";
import Navbar from "./Navbar";
import Contact from "./Contact/Contact";
import MainPage from "./LoginSignup/MainPage/MainPage";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
