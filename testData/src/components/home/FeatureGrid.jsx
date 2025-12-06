import React from "react";
import FeatureCard from "./FeatureCard";

function FeatureGrid() {
  return (
    <section className="feature-grid">
      <FeatureCard title="Fast" description="Lightning fast performance" icon="bolt" />
      <FeatureCard title="Secure" description="Enterprise-grade security" icon="shield" />
      <FeatureCard title="Scalable" description="Grows with your business" icon="chart" />
    </section>
  );
}

export default FeatureGrid;

