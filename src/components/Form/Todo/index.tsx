import { TodoSchema, todoFormSchema } from "@/types/forms";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../Button";

export default function TodoForm({
  refetchTodos,
}: {
  refetchTodos: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoFormSchema),
  });
  const { mutateAsync: createTodo } = trpc.todo.createTodo.useMutation();

  const onSubmit: SubmitHandler<TodoSchema> = async ({ content }) => {
    setLoading(true);

    await createTodo(
      {
        content,
      },
      {
        onSuccess: () => {
          refetchTodos();
          setValue("content", "");
          setLoading(false);
        },
      }
    );
  };

  const classes = classNames({
    "border-red-500": errors.content,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-md justify-center mx-auto mt-8 w-full"
    >
      <label
        className="uppercase font-bold text-sm text-indigo-800"
        htmlFor="content"
      >
        New Todo
      </label>
      {errors.content && (
        <span className="text-xs text-red-500 mt-2">
          {errors.content.message}
        </span>
      )}
      <textarea
        className={`rounded-md border-2 transition-colors focus:outline-none focus:border-indigo-500 border-indigo-100 mb-4 mt-2 py-2 px-2 text-sm ${classes}`}
        {...register("content", { required: true })}
      />

      <Button loading={loading} text={loading ? "Submitting" : "Submit"} />
    </form>
  );
}
