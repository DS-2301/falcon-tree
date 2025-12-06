import React from "react";

function StatItem({ label, value }) {
  return (
    <div className="stat-item">
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </div>
  );
}

export default StatItem;

