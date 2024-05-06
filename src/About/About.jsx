import React, { useState } from "react";
import "./About.css";
import Image3 from "../asset/helpinghandlogo.jpg";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <img src={Image3} class="logo" />
        <h2>About Us</h2>
        <p>
          {" "}
          At Helping Hands, we are more than just a charitable organization; we
          are a family-driven initiative deeply committed to making a tangible
          difference in the lives of those less fortunate. Founded with a vision
          to extend a helping hand to the underprivileged in India, our roots
          lie in the values of compassion, empathy, and community. As a
          family-run endeavor, our dedication stems from personal experiences
          and a shared desire to create positive change. With each donation and
          crowdfunded initiative, we strive to empower individuals and
          communities across India, fostering hope and dignity where it's needed
          most.
        </p>
        <p>
          Since we began, Helping Hands has been dedicated to helping people in
          need and improving communities across India. We're transparent about
          how we use every donation, ensuring it directly supports essential
          projects like providing food, shelter, and education. Our goal is to
          address immediate needs while also working on long-term solutions to
          poverty. Together, we're making a positive impact, one step at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
