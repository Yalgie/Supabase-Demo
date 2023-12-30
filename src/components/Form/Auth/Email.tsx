import { EmailSchema, emailFormSchema } from "@/types/forms";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../Button";
import classNames from "classnames";

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

  const classes = classNames({
    "border-red-500": errors.email,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-md justify-center mx-auto mt-8"
    >
      <label
        className="uppercase font-bold text-sm text-indigo-800"
        htmlFor="email"
      >
        Email
      </label>
      {errors.email && (
        <span className="text-xs text-red-500 mt-2">
          {errors.email.message}
        </span>
      )}
      <input
        className={`rounded-md border-2 transition-colors focus:outline-none focus:border-indigo-500 border-indigo-100 mb-4 mt-2 py-2 px-2 text-sm ${classes}`}
        {...register("email", { required: true })}
      />

      <Button loading={loading} text={loading ? "Sending" : "Send"} />
    </form>
  );
}
