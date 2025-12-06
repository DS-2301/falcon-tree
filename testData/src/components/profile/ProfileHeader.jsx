import React from "react";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ProfileHeader() {
  return (
    <div className="profile-header">
      <Avatar src="/user.jpg" size="xl" />
      <h1>John Doe</h1>
      <Badge variant="primary">Pro Member</Badge>
      <Button variant="outline">Edit Profile</Button>
      <Button variant="secondary">Share Profile</Button>
    </div>
  );
}

export default ProfileHeader;

