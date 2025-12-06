import React from "react";
import StatsGrid from "../components/dashboard/StatsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <StatsGrid />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}

export default Dashboard;
