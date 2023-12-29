import { CodeSchema, codeFormSchema } from "@/types/forms";
import { supabase } from "@/utils/supabase";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AuthCodeForm({ email }: { email: string }) {
  const router = useRouter();
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>We sent you an email with a code</p>
      <label htmlFor="code">Code</label>
      <input {...register("code", { required: true })} />
      {errors.code && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
