import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { supabase } from "../utils/supabaseClient";

const MainPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [donationLink, setDonationLink] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchEvents();
    checkUser();
  }, []);

  // Function to check if the current user is an admin
  const checkUser = async () => {
    const { data: adminEmails, error } = await supabase
      .from("adminemails")
      .select("emails");

    if (error) {
      console.error("Error fetching admin emails:", error.message);
      setError("Error fetching admin emails: " + error.message);
    } else {
      const currentUser = supabase.auth.getUser();
      if (currentUser) {
        const userEmail = currentUser.email;
        const isAdminUser = adminEmails.some(
          (admin) => admin.email === userEmail
        );
        setIsAdmin(isAdminUser);
        setUser(currentUser);
      }
    }
  };

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

  const handleSubmit = async () => {
    setError(""); // Reset errors on new submission
    if (editingEvent && editingEvent.eventId) {
      // Ensure editingEvent and its eventId are not null
      const { error: updateError } = await supabase
        .from("eventz")
        .update({
          name: eventName,
          location,
          description,
          donation_link: donationLink,
        })
        .eq("eventId", editingEvent.eventId);

      if (updateError) {
        console.error("Error updating event:", updateError.message);
        setError("Error updating event: " + updateError.message);
      } else {
        // Update the events array in the state directly
        const updatedEvents = events.map((event) =>
          event.eventId === editingEvent.eventId
            ? {
                ...event,
                name: eventName,
                location,
                description,
                donation_link: donationLink,
              }
            : event
        );
        setEvents(updatedEvents);
        setEditingEvent(null); // Reset editing event
      }
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from("eventz")
        .insert([
          {
            name: eventName,
            location,
            description,
            donation_link: donationLink,
          },
        ]);

      if (insertError) {
        console.error("Error inserting event:", insertError.message);
        setError("Error inserting event: " + insertError.message);
      } else {
        // Handle single or multiple insertions correctly
        if (insertData && insertData.length > 0) {
          setEvents([...events, insertData[0]]);
        } else {
          console.error("Insert data is missing or empty:", insertData);
        }
      }
    }

    // Reset form fields
    setEventName("");
    setLocation("");
    setDescription("");
    setDonationLink("");
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setLocation(event.location);
    setDescription(event.description);
    setDonationLink(event.donation_link);
  };

  const handleDelete = async (event) => {
    const { error: deleteError } = await supabase
      .from("eventz")
      .delete()
      .eq("eventId", event.eventId);

    if (deleteError) {
      console.error("Error deleting event:", deleteError.message);
      setError("Error deleting event: " + deleteError.message);
    } else {
      setEvents(events.filter((e) => e.eventId !== event.eventId));
    }
  };

  return (
    <div className="event-page">
      {error && <p className="error-message">{error}</p>}
      {isAdmin && (
        <>
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
          <button onClick={handleSubmit}>
            {editingEvent ? "Update Event" : "Create Event"}
          </button>
        </>
      )}
      <div className="event-cards">
        {events.map((event, index) => (
          <div key={index} className="event-card">
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
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
