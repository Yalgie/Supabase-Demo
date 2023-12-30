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
    <div className="bg-slate-50 mb-4 p-4 rounded-md flex flex-col">
      <p>{todo.content}</p>
      {/* <p>{todo.completed ? "Yuh" : "Nuh"}</p> */}
      {/* <span onClick={handleToggle}>Toggle</span> */}
      <div className="flex w-full justify-between mt-4">
        <span
          className="text-emerald-500 self-end uppercase text-sm font-bold cursor-pointer"
          onClick={handleToggle}
        >
          {todo.completed ? "Uncomplete" : "Complete"}
        </span>
        <span
          className="text-red-500 self-end uppercase text-sm font-bold cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
}
