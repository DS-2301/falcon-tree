import React from "react";
import Card from "../components/ui/Card";
import LoginForm from "../components/forms/LoginForm";
import SocialLogin from "../components/forms/SocialLogin";
import Logo from "../components/ui/Logo";

function Login() {
  return (
    <div className="login-page">
      <Card>
        <Logo size="lg" />
        <LoginForm />
        <SocialLogin />
      </Card>
    </div>
  );
}

export default Login;
