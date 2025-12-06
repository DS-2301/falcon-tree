import React from "react";
import StatItem from "./StatItem";

function ProfileStats() {
  return (
    <div className="profile-stats">
      <StatItem label="Followers" value="1,234" />
      <StatItem label="Following" value="567" />
      <StatItem label="Projects" value="42" />
    </div>
  );
}

export default ProfileStats;

