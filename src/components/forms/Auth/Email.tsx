import { EmailSchema, emailFormSchema } from "@/types/forms";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AuthEmailForm({
  setEmail,
}: {
  setEmail: (sent: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailFormSchema),
  });

  const onSubmit: SubmitHandler<EmailSchema> = async ({ email }) => {
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
    });
    setEmail(email);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <input type="submit" value={loading ? "Sending" : "Send"} />
    </form>
  );
}
