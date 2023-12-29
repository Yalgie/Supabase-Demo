import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import { useProtectedPage } from "@/hooks/useProtectedPage";
import TodoForm from "@/components/forms/Todo";
import Todo from "@/components/Todo";
import { useGetTodos } from "@/hooks/useGetTodos";

export default function Dashboard() {
  useProtectedPage();

  const router = useRouter();
  const { todos, refetch: refetchTodos } = useGetTodos();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <button onClick={handleSignOut}>Sign out</button>

      {todos &&
        todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} refetchTodos={refetchTodos} />;
        })}

      <TodoForm refetchTodos={refetchTodos} />
    </>
  );
}
