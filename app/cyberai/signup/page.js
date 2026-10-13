import { Suspense } from "react";
import { SignupForm } from "@/components/cyberai/AuthForms";
import { meta } from "@/lib/cyberai";

export const metadata = meta({
  title: "Create an account",
  description: "Create a Cyber AI account. Email and a password open the console in this browser until Firebase Auth is connected.",
  path: "/signup"
});

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="cai"><p className="cai-boot">Loading the form…</p></div>}>
      <SignupForm />
    </Suspense>
  );
}
