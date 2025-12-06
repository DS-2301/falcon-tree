import React from "react";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <TestimonialCard name="John Doe" role="CEO" quote="Amazing product!" />
      <TestimonialCard name="Jane Smith" role="CTO" quote="Highly recommended!" />
    </section>
  );
}

export default Testimonials;

