import React from "react";
import SettingsTabs from "../components/settings/SettingsTabs";
import SettingsPanel from "../components/settings/SettingsPanel";

function Settings() {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <SettingsTabs />
      <SettingsPanel />
    </div>
  );
}

export default Settings;
