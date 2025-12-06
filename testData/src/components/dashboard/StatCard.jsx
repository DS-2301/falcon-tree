import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function StatCard({ label, value, change }) {
  return (
    <Card padding="md">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      <Badge variant={change.startsWith('+') ? 'success' : 'danger'}>{change}</Badge>
    </Card>
  );
}

export default StatCard;

