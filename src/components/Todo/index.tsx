import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";

export default function Todo({
  todo,
  refetchTodos,
}: {
  todo: Todo;
  refetchTodos: () => void;
}) {
  const { mutateAsync: deleteTodo } = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => refetchTodos(),
  });
  const { mutateAsync: toggleTodo } = trpc.todo.toggleTodo.useMutation({
    onSuccess: () => refetchTodos(),
  });

  const handleDelete = async () => {
    await deleteTodo({
      id: todo.id,
    });
  };

  const handleToggle = async () => {
    await toggleTodo({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <>
      <p>{todo.content}</p>
      <p>{todo.completed ? "Yuh" : "Nuh"}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggle}>Toggle</button>
    </>
  );
}
