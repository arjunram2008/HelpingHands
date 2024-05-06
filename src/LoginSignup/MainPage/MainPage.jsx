import React, { useState } from "react";
import "./MainPage.css";
import { supabase } from "../utils/supabaseClient";

const MainPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [donationLink, setDonationLink] = useState("");
  const [error, setError] = useState(""); // State to capture and display any errors

  const handleSubmit = async () => {
    setError(""); // Reset errors on new submission
    const { data, error } = await supabase
      .from("events")
      .insert([
        { name: eventName, location, description, donation_link: donationLink },
      ]);

    if (error) {
      console.error("Error inserting event:", error.message);
      setError("Error inserting event: " + error.message); // Display error to the user
    } else {
      data &&
        Array.isArray(data) &&
        data.every((item) => item.name && item.location && item.description);
      {
        setEvents([...events, data]);
      }
      setEventName("");
      setLocation("");
      setDescription("");
      setDonationLink("");
    }
  };

  return (
    <div className="event-page">
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Enter the name of your event"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Donation Link"
        value={donationLink}
        onChange={(e) => setDonationLink(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Event</button>
      console.log(events); // Check what events array contains right before it's
      mapped
      <div className="event-cards">
        {events.map((event, index) => (
          <div key={event.id || index} className="event-card">
            <h3>{event?.name || "Default Event Name"}</h3>
            <p>{event?.location || "No location provided"}</p>
            <p>{event?.description || "No description"}</p>
            {event?.donation_link && (
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

export default MainPage;
