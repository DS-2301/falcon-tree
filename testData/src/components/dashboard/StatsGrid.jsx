import React from "react";
import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="stats-grid">
      <StatCard label="Total Users" value="12,345" change="+12%" />
      <StatCard label="Revenue" value="$54,321" change="+8%" />
      <StatCard label="Active Sessions" value="1,234" change="+23%" />
      <StatCard label="Conversion Rate" value="3.2%" change="-2%" />
    </div>
  );
}

export default StatsGrid;

