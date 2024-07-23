import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Image from "./asset/helpinghandlogo.jpg";
import { UserContext } from "./LoginSignup/utils/UserContext";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cisyqubvjiglqmkadgmd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc3lxdWJ2amlnbHFta2FkZ21kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDg1NzEwNiwiZXhwIjoyMDMwNDMzMTA2fQ.7B630DsxRhHgYhgsLxitipQ6htlGjZ2aM1IqBYYLW9I";
const supabase = createClient(supabaseUrl, supabaseKey);

const Navbar = () => {
  const { user, signOut } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkAdminStatus(); // Check if user is admin on component mount
  }, [user]); // Re-check if user changes

  const checkAdminStatus = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("adminemails")
          .select("emails")
          .eq("emails", user.email);

        if (error) {
          throw error;
        }

        setIsAdmin(data.length > 0); // Check if user.email exists in adminemails table
      } catch (error) {
        console.error("Error checking admin status:", error.message);
      }
    }
  };

  const handleLogout = () => {
    signOut();
    setShowDropdown(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={Image} className={styles.logo} alt="Logo" />
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {user ? (
          <>
            {isAdmin && (
              <>
                <li>
                  <Link to="/eventcreation">Event Creation</Link>
                </li>
                <li>
                  <Link to="/adminpage">Admin Page</Link>
                </li>
              </>
            )}
            <div className={styles.userButtonContainer}>
              <button onClick={() => setShowDropdown(!showDropdown)}>
                {user.email}
              </button>
              {showDropdown && (
                <div className={styles.dropdown}>
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <li>
            <Link to="/loginsignup">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
