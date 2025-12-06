import React from "react";
import Tab from "../navigation/Tab";

function SettingsTabs() {
  return (
    <div className="settings-tabs">
      <Tab label="General" active />
      <Tab label="Security" />
      <Tab label="Notifications" />
      <Tab label="Billing" />
    </div>
  );
}

export default SettingsTabs;

