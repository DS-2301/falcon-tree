import React from "react";
import Logo from "../ui/Logo";
import NavItem from "../navigation/NavItem";

function Footer() {
  return (
    <footer className="footer">
      <Logo size="sm" />
      <nav>
        <NavItem href="/about" label="About" />
        <NavItem href="/contact" label="Contact" />
        <NavItem href="/privacy" label="Privacy" />
      </nav>
    </footer>
  );
}

export default Footer;

