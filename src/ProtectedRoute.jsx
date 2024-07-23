import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./LoginSignup/utils/UserContext";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cisyqubvjiglqmkadgmd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc3lxdWJ2amlnbHFta2FkZ21kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDg1NzEwNiwiZXhwIjoyMDMwNDMzMTA2fQ.7B630DsxRhHgYhgsLxitipQ6htlGjZ2aM1IqBYYLW9I";
const supabase = createClient(supabaseUrl, supabaseKey);

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus(); // Check if user is admin on component mount
  }, [user]); // Re-check if user changes

  const checkAdminStatus = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("adminemails")
          .select("emails");

        if (error) {
          throw error;
        }

        const adminEmails = data.map((entry) => entry.emails);
        setIsAdmin(!adminEmails.includes(user.email)); // Check if user's email is not in admin emails

        setLoading(false);
      } catch (error) {
        console.error("Error checking admin status:", error.message);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Placeholder until admin status is determined
  }

  if (!user || isAdmin) {
    return <Navigate to="/loginsignup" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
