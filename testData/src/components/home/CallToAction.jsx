import React from "react";
import Button from "../ui/Button";

function CallToAction() {
  return (
    <section className="cta">
      <h2>Ready to get started?</h2>
      <p>Join thousands of happy customers today</p>
      <Button variant="primary" size="xl">Start Free Trial</Button>
    </section>
  );
}

export default CallToAction;

