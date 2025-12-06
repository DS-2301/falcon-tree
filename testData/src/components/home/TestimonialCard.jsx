import React from "react";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";

function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <Card padding="md">
      <Avatar src={avatar} size="md" />
      <p className="quote">{quote}</p>
      <div className="author">
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
    </Card>
  );
}

export default TestimonialCard;

