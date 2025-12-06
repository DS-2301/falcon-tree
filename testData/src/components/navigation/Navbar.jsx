import React from "react";
import Logo from "../ui/Logo";
import NavItem from "./NavItem";
import Button from "../ui/Button";

function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavItem href="/" label="Home" />
      <NavItem href="/features" label="Features" />
      <NavItem href="/pricing" label="Pricing" />
      <Button variant="primary">Get Started</Button>
    </nav>
  );
}

export default Navbar;

