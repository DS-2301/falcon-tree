import React from "react";
import FormField from "./FormField";
import Button from "../ui/Button";
import Checkbox from "./Checkbox";

function LoginForm() {
  return (
    <form className="login-form">
      <FormField label="Email" type="email" />
      <FormField label="Password" type="password" />
      <Checkbox label="Remember me" />
      <Button variant="primary" size="lg">Sign In</Button>
    </form>
  );
}

export default LoginForm;

