import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetSession } from "./useGetSession";

export const useProtectedPage = () => {
  const router = useRouter();
  const { session } = useGetSession();

  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [session, router]);
};
