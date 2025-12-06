import React from "react";
import Avatar from "../ui/Avatar";
import Dropdown from "../navigation/Dropdown";
import DropdownItem from "../navigation/DropdownItem";

function UserMenu() {
  return (
    <div className="user-menu">
      <Avatar src="/user.jpg" size="sm" />
      <Dropdown>
        <DropdownItem label="Profile" href="/profile" />
        <DropdownItem label="Settings" href="/settings" />
        <DropdownItem label="Logout" onClick={() => {}} />
      </Dropdown>
    </div>
  );
}

export default UserMenu;

