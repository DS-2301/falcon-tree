import React from "react";
import Button from "../ui/Button";

function Hero() {
  return (
    <section className="hero">
      <h1>Welcome to Our Platform</h1>
      <p>Build amazing things with our tools</p>
      <Button variant="primary" size="lg">Get Started</Button>
      <Button variant="outline" size="lg">Learn More</Button>
    </section>
  );
}

export default Hero;

