import React from "react";
import Hero from "../components/home/Hero";
import FeatureGrid from "../components/home/FeatureGrid";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";

function Home() {
  return (
    <div className="home">
      <Hero />
      <FeatureGrid />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default Home;
