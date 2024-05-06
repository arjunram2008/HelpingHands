import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import "./s.css";
import user_icon from "../asset/person.png";
import email_icon from "../asset/email.png";
import password_icon from "../asset/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Attempting to login with:", email, password);
    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
        setErrorMessage(error.message);
      } else if (user) {
        console.log("Logged in successfully, user:", user);
        navigate("/events");
      } else {
        console.log(
          "Login attempt returned no errors but no user object was returned."
        );
        navigate("/events");
        setErrorMessage("Login failed, please try again.");
      }
    } catch (ex) {
      console.error("Exception during login:", ex.message);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleSignup = async () => {
    const { error, user } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          name: name,
        },
      }
    );
    if (error) {
      console.error("Error signing up:", error.message);
      setErrorMessage(error.message);
    } else {
      console.log("Signed up successfully");
      navigate("/events");
    }
  };

  const handleSubmit = () => {
    if (action === "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="container1">
      <UserButton />
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click here!</span>
        </div>
      )}
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Submit
        </div>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Signup")}
        >
          Sign Up
        </div>
        <div
          className={action === "Signup" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

const UserButton = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = supabase.auth.getUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="user-button-container">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {user ? user.email : "No User"}{" "}
        {/* Displaying the user's email or placeholder if not logged in */}
      </button>
      {showDropdown && (
        <div className="dropdown">
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
