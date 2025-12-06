import React from "react";

function Card({ children, padding }) {
  return <div className={`card card-p-${padding}`}>{children}</div>;
}

export default Card;

