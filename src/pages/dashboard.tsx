import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import { useProtectedPage } from "@/hooks/useProtectedPage";
import TodoForm from "@/components/Form/Todo";
import Todo from "@/components/Todo";
import { useGetTodos } from "@/hooks/useGetTodos";
import { Button } from "@/components/Form/Button";
import { Spinner } from "@/components/Spinner";

export default function Dashboard() {
  useProtectedPage();

  const router = useRouter();
  const { todos, isLoading, refetch: refetchTodos } = useGetTodos();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      <Button
        text="Sign Out"
        onClick={handleSignOut}
        customClass="bg-red-500 hover:bg-red-400 self-end m-4"
      />

      <div className="mx-auto w-96">
        {isLoading && (
          <div className="flex uppercase font-bold text-sm text-indigo-800 items-center">
            <span style={{ top: "1px" }} className="mr-2 relative font-sm">
              Fetching Todos
            </span>
            <Spinner />
          </div>
        )}
        {todos &&
          todos.map((todo) => {
            return (
              <Todo key={todo.id} todo={todo} refetchTodos={refetchTodos} />
            );
          })}

        <TodoForm refetchTodos={refetchTodos} />
      </div>
    </div>
  );
}
