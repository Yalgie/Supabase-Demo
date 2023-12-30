import { CodeSchema, codeFormSchema } from "@/types/forms";
import { supabase } from "@/utils/supabase";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../Button";
import { useState } from "react";

export default function AuthCodeForm({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CodeSchema>({
    resolver: zodResolver(codeFormSchema),
  });
  const { mutateAsync: createUser } = trpc.user.createUser.useMutation();

  const onSubmit: SubmitHandler<CodeSchema> = async ({ code }) => {
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      setError("code", {
        message: "Invalid code",
      });
    } else {
      await createUser();
      router.push("/dashboard");
    }

    setLoading(false);
  };

  const classes = classNames({
    "border-red-500": errors.code,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-md justify-center mx-auto mt-8"
    >
      <label
        className="uppercase font-bold text-sm text-indigo-800"
        htmlFor="code"
      >
        Code
      </label>
      {errors.code && (
        <span className="text-xs text-red-500 mt-2">{errors.code.message}</span>
      )}
      <input
        className={`rounded-md border-2 transition-colors focus:outline-none focus:border-indigo-500 border-indigo-100 mb-4 mt-2 py-2 px-2 text-sm ${classes}`}
        {...register("code", { required: true })}
      />

      <Button loading={loading} text={loading ? "Submitting" : "Submit"} />
    </form>
  );
}
