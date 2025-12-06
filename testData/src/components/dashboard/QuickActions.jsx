import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function QuickActions() {
  return (
    <Card padding="md">
      <h3>Quick Actions</h3>
      <Button variant="primary">Create Report</Button>
      <Button variant="secondary">Export Data</Button>
      <Button variant="outline">Invite Team</Button>
    </Card>
  );
}

export default QuickActions;

