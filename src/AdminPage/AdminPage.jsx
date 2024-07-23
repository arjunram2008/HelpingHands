import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./AdminPage.css";

const supabaseUrl = "https://cisyqubvjiglqmkadgmd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc3lxdWJ2amlnbHFta2FkZ21kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDg1NzEwNiwiZXhwIjoyMDMwNDMzMTA2fQ.7B630DsxRhHgYhgsLxitipQ6htlGjZ2aM1IqBYYLW9I";
const supabase = createClient(supabaseUrl, supabaseKey);

const InputList = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState(null);
  const [adminEmails, setAdminEmails] = useState([]);

  useEffect(() => {
    fetchAdminEmails(); // Fetch admin emails from Supabase on component mount
  }, []);

  const fetchAdminEmails = async () => {
    try {
      let { data: adminEmails, error } = await supabase
        .from("adminemails")
        .select("*");
      if (error) {
        throw error;
      }
      setAdminEmails(adminEmails);
    } catch (error) {
      console.error("Error fetching admin emails:", error.message);
    }
  };

  const handleAddEmail = async () => {
    if (!inputEmail.trim()) {
      setError("Please enter an email address.");
      return;
    }

    if (!isValidEmail(inputEmail)) {
      setError("Invalid Email");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("adminemails")
        .insert([{ emails: inputEmail }]); // Insert into 'emails' column

      if (error) {
        throw error;
      }

      setAdminEmails([...adminEmails, { emails: inputEmail }]); // Update state with the new email
      setInputEmail(""); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error adding email:", error.message);
    }
  };

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div>
      <input
        type="email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <button onClick={handleAddEmail}>Add Email</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>Admin Emails</h3>
        <ul>
          {adminEmails.map((email, index) => (
            <li key={index}>{email.emails}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputList;
