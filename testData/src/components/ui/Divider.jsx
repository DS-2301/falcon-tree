import React from "react";

function Divider({ orientation }) {
  return <hr className={`divider divider-${orientation}`} />;
}

export default Divider;

