import React from "react";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";

function ActivityItem({ type, user, time }) {
  return (
    <div className="activity-item">
      <Icon name={type} />
      <Avatar src={`/avatars/${user}.jpg`} size="sm" />
      <span className="user">{user}</span>
      <span className="time">{time}</span>
    </div>
  );
}

export default ActivityItem;

