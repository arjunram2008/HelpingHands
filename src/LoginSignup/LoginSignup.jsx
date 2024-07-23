import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import { UserContext } from "./utils/UserContext";
import "./s.css";
import user_icon from "../asset/person.png";
import email_icon from "../asset/email.png";
import password_icon from "../asset/password.png";

const LoginSignup = () => {
  const { setUser } = useContext(UserContext);
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Attempting to login with:", email, password);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
        setErrorMessage(error.message);
      } else if (user) {
        console.log("Logged in successfully, user:", user);
        setUser(user);
        navigate("/");
      } else {
        console.warn(
          "Login attempt returned no errors but no user object was returned."
        );
        navigate("/");
      }
    } catch (ex) {
      console.error("Exception during login:", ex.message);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleSignup = async () => {
    console.log("Attempting to sign up with:", email, password, name);
    try {
      const { user, error } = await supabase.auth.signUp(
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
        if (error.message.includes("already registered")) {
          setErrorMessage("This email is already registered with an account.");
        } else {
          console.error("Error signing up:", error.message);
          setErrorMessage(error.message);
        }
      } else if (user) {
        console.log("Signed up successfully, user:", user);
        setUser(user);
        navigate("/");
        setErrorMessage("Sent confirmation email!");
      } else {
        console.warn(
          "Signup attempt returned no errors but no user object was returned."
        );
        setErrorMessage("Sent Confirmation email!");
        navigate("/");
      }
    } catch (ex) {
      console.error("Exception during signup:", ex.message);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleSubmit = async () => {
    setErrorMessage(""); // Clear previous error messages
    if (action === "Login") {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className="container1">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
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
      {action === "Login" && (
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
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
