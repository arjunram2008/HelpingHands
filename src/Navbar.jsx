import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.module.css";
import Typist from "react-typist";
import Image from "./asset/helpinghandlogo.jpg";
import Image1 from "./asset/cart.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={Image} className="logo" alt="Logo" />
      <ul className="nav-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/loginsignup">Login/SignUp</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
