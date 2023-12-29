import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  return {
    authorization: req.headers.authorization,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
