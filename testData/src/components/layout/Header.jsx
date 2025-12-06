import React from "react";
import Navbar from "../navigation/Navbar";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

function Header() {
  return (
    <header className="header">
      <Navbar />
      <SearchBar />
      <UserMenu />
    </header>
  );
}

export default Header;

