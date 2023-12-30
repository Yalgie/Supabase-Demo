import { useState } from "react";
import AuthEmailForm from "@/components/Form/Auth/Email";
import AuthCodeForm from "@/components/Form/Auth/Code";

export default function Auth() {
  const [email, setEmail] = useState("");

  return (
    <>
      {!email && <AuthEmailForm setEmail={setEmail} />}
      {email && <AuthCodeForm email={email} />}
    </>
  );
}
