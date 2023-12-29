import { trpc } from "@/utils/trpc";
import { useGetSession } from "./useGetSession";

export const useGetUser = () => {
  const { session } = useGetSession();
  const { data, ...rest } = trpc.user.getUser.useQuery(undefined, {
    enabled: session !== null && session !== "loading",
  });

  return {
    user: data,
    ...rest,
  };
};
