import { TodoSchema, todoFormSchema } from "@/types/forms";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

export default function TodoForm({
  refetchTodos,
}: {
  refetchTodos: () => void;
}) {
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
    await createTodo(
      {
        content,
      },
      {
        onSuccess: () => {
          refetchTodos();
          setValue("content", "");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="content">Content</label>
      <textarea {...register("content", { required: true })} />
      {errors.content && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
