import React from "react";
import Icon from "../ui/Icon";
import Card from "../ui/Card";

function FeatureCard({ title, description, icon }) {
  return (
    <Card padding="lg">
      <Icon name={icon} size="lg" />
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}

export default FeatureCard;

