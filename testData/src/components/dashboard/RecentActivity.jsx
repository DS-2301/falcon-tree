import React from "react";
import Card from "../ui/Card";
import ActivityItem from "./ActivityItem";

function RecentActivity() {
  return (
    <Card padding="lg">
      <h3>Recent Activity</h3>
      <ActivityItem type="signup" user="John Doe" time="2 min ago" />
      <ActivityItem type="purchase" user="Jane Smith" time="5 min ago" />
      <ActivityItem type="login" user="Bob Wilson" time="10 min ago" />
    </Card>
  );
}

export default RecentActivity;

