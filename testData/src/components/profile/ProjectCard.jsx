import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ProjectCard({ title, description, status }) {
  return (
    <Card padding="md">
      <h3>{title}</h3>
      <p>{description}</p>
      <Badge variant="info">{status || 'Active'}</Badge>
      <Button variant="ghost" size="sm">View</Button>
    </Card>
  );
}

export default ProjectCard;

