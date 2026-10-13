import { ForgotForm } from "@/components/cyberai/AuthForms";
import { meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Reset password",
  description: "Request a Cyber AI password reset. Mail is not connected yet, so a reset link is not sent.",
  path: "/forgot"
});

export default function ForgotPage() {
  return <ForgotForm />;
}
