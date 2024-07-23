import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginSignup from "./LoginSignup/LoginSignup";
import About from "./About/About";
import Navbar from "./Navbar";
import Contact from "./Contact/Contact";
import MainPage from "./LoginSignup/MainPage/MainPage";
import EventsPagePublic from "./LoginSignup/EventsPagePublic/EventsPagePublic";
import AdminPage from "./AdminPage/AdminPage";
import { UserProvider } from "./LoginSignup/utils/UserContext";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/events" element={<EventsPagePublic />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/adminpage"
            element={<ProtectedRoute element={AdminPage} />}
          />
          <Route
            path="/eventcreation"
            element={<ProtectedRoute element={MainPage} />}
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
