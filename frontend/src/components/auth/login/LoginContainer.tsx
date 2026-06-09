import AuthContainer from "../AuthContainer";

import LoginForm from "./LoginForm";
import LoginBrandingPanel from "./LoginBrandingPanel";

export default function LoginContainer() {
  return (
    <AuthContainer
      variant="login"
      formPanel={<LoginForm />}
      brandingPanel={
        <LoginBrandingPanel />
      }
    />
  );
}