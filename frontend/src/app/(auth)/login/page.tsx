import AuthContainer from "@/components/auth/AuthContainer";

import LoginForm from "@/components/auth/login/LoginForm";
import LoginRightPanel from "@/components/auth/login/LoginRightPanel";

export default function LoginPage() {
  return (
    <AuthContainer
      leftPanel={<LoginRightPanel />}
      rightPanel={<LoginForm />}
    />
  );
}