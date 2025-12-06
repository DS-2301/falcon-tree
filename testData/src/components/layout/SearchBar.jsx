import React from "react";
import Input from "../forms/Input";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

function SearchBar() {
  return (
    <div className="search-bar">
      <Icon name="search" />
      <Input placeholder="Search..." type="text" />
      <Button variant="ghost" size="sm">Search</Button>
    </div>
  );
}

export default SearchBar;

