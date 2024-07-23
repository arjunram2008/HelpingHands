import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import "./EventsPagePublic.css"; // Ensure to create and import a CSS file for styling

const EventsPagePublic = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data: fetchedEvents, error: fetchError } = await supabase
      .from("eventz")
      .select("*");
    if (fetchError) {
      console.error("Error fetching events:", fetchError.message);
      setError("Error fetching events: " + fetchError.message);
    } else {
      setEvents(fetchedEvents);
    }
  };

  return (
    <div className="event-page">
      {error && <p className="error-message">{error}</p>}
      <div className="event-cards">
        {events.map((event, index) => (
          <div key={event.id || index} className="event-card">
            <h3>{event.name || "Default Event Name"}</h3>
            <p>{event.location || "No location provided"}</p>
            <p>{event.description || "No description"}</p>
            {event.donation_link && (
              <a
                href={event.donation_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Here
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPagePublic;
