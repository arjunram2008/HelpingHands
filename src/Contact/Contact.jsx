import ammapic from "../asset/ammapicture.png";
import perimapic from "../asset/vijayaperima.png";
import React from "react";
import styles from "./Contact.module.css";

function ContactCard(props) {
  return (
    <div className={styles['contact-card']}>
      <div className={styles['contact-card-top']}>
        <h2 className={styles['contact-card-name']}>{props.name}</h2>
        <img className={styles['contact-card-img']} src={props.img} alt="avatar_img" />
      </div>
      <div className={styles['contact-card-bottom']}>
        <p className={styles['contact-card-info']}>{props.phone}</p>
        <p className={styles['contact-card-info']}>{props.mail}</p>
      </div>
    </div>
  );
}

function ContactCards() {
  return (
    <div className={styles['contact-body']}>
      <h1 className={styles['contact-heading']}>My Contact</h1>
      <ContactCard
        name="Arjun Ramesh"
        img="https://wallpapercave.com/wp/wp1859026.jpg"
        phone="925-309-9365"
        mail="arjunramesh8002@gmail.com"
      />

      <ContactCard
        name="Vijaya Saravanan"
        phone="+91 98407 23107"
        mail="Vijaya_saru@yahoo.co.in"
        img={perimapic}
      />

      <ContactCard
        name="Gayathri Ramesh"
        phone="925-858-7528"
        mail="gayram2004@gmail.com"
        img={ammapic}
      />
    </div>
  );
}

export default ContactCards;
