import React from "react";
import Card from "../ui/Card";
import FormField from "../forms/FormField";
import Toggle from "../forms/Toggle";
import Button from "../ui/Button";

function SettingsPanel() {
  return (
    <Card padding="lg">
      <FormField label="Display Name" type="text" />
      <FormField label="Email" type="email" />
      <FormField label="Bio" type="textarea" />
      <Toggle label="Email Notifications" />
      <Toggle label="Push Notifications" />
      <Toggle label="Marketing Emails" />
      <Button variant="primary">Save Changes</Button>
    </Card>
  );
}

export default SettingsPanel;

