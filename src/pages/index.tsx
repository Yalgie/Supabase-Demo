import { useState } from "react";
import AuthEmailForm from "@/components/forms/Auth/Email";
import AuthCodeForm from "@/components/forms/Auth/Code";

export default function Auth() {
  const [email, setEmail] = useState("");

  return (
    <>
      {!email && <AuthEmailForm setEmail={setEmail} />}
      {email && <AuthCodeForm email={email} />}
    </>
  );
}
