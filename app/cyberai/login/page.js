import { LoginForm } from "@/components/cyberai/AuthForms";
import { meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Log in",
  description: "Log in to the Cyber AI console with the email and password saved in this browser.",
  path: "/login"
});

export default function LoginPage() {
  return <LoginForm />;
}
