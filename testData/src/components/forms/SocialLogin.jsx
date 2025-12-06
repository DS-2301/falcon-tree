import React from "react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

function SocialLogin() {
  return (
    <div className="social-login">
      <Button variant="outline">
        <Icon name="google" />
        Continue with Google
      </Button>
      <Button variant="outline">
        <Icon name="github" />
        Continue with GitHub
      </Button>
    </div>
  );
}

export default SocialLogin;

