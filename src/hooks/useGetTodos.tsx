import { trpc } from "@/utils/trpc";
import { useGetSession } from "./useGetSession";

export const useGetTodos = () => {
  const { session } = useGetSession();
  const { data, ...rest } = trpc.todo.getTodos.useQuery(undefined, {
    enabled: session !== null && session !== "loading",
  });

  return {
    todos: data,
    ...rest,
  };
};
