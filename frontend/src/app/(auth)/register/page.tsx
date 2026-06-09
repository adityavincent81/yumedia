import AuthContainer from "@/components/auth/AuthContainer";

import RegisterLeftPanel from "@/components/auth/register/RegisterLeftPanel";
import RegisterForm from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthContainer
      leftPanel={<RegisterLeftPanel />}
      rightPanel={<RegisterForm />}
    />
  );
}