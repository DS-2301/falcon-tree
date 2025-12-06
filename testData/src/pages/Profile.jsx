import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileContent from "../components/profile/ProfileContent";

function Profile() {
  return (
    <div className="profile">
      <ProfileHeader />
      <ProfileStats />
      <ProfileContent />
    </div>
  );
}

export default Profile;
