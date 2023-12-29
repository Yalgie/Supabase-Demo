import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import jwt, { type JwtPayload } from "jsonwebtoken";

const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  const { authorization } = ctx;

  if (!authorization) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  const user = jwt.verify(
    authorization,
    process.env.SUPABASE_JWT!
  ) as JwtPayload;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
