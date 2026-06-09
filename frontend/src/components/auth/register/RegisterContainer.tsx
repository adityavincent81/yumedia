import AuthContainer from "../AuthContainer";

import RegisterForm from "./RegisterForm";
import RegisterBrandingPanel from "./RegisterBrandingPanel";

export default function RegisterContainer() {
  return (
    <AuthContainer
      variant="register"
      formPanel={<RegisterForm />}
      brandingPanel={
        <RegisterBrandingPanel />
      }
    />
  );
}