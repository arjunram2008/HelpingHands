import ammapic from "../asset/ammapicture.png";
import perimapic from "../asset/vijayaperima.png";
import React from "react";
function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">{props.phone}</p>
        <p className="info">{props.mail}</p>
      </div>
    </div>
  );
}

function ContactCards() {
  return (
    <div>
      <h1>My Contact</h1>
      <Card
        name="Arjun Ramesh"
        img="https://wallpapercave.com/wp/wp1859026.jpg"
        phone="925-309-9365"
        mail="arjunramesh8002@gmail.com"
      />

      <Card
        name="Vijaya Saravanan"
        phone="+91 98407 23107"
        mail="Vijaya_saru@yahoo.co.in"
        img={perimapic}
      />

      <Card
        name="Gayathri Ramesh"
        phone="925-858-7528"
        mail="gayram2004@gmail.com"
        img={ammapic}
      />
    </div>
  );
}

export default ContactCards;
