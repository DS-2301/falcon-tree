import React from "react";

function Avatar({ src, size, alt }) {
  return <img className={`avatar avatar-${size}`} src={src} alt={alt} />;
}

export default Avatar;

