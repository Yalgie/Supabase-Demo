import { protectedProcedure, router } from "../trpc";
import { db } from "@/utils/db";

export const userRouter = router({
  getUser: protectedProcedure.query(async (opts) => {
    const { ctx } = opts;
    const { sub } = ctx.user;

    const user = await db.user.findUnique({
      where: {
        id: sub,
      },
    });

    return {
      user,
    };
  }),
  createUser: protectedProcedure.mutation(async (opts) => {
    const { ctx } = opts;
    const { sub, email } = ctx.user;

    try {
      const existingUser = await db.user.findUnique({
        where: {
          id: sub,
        },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            id: sub,
            email,
          },
        });

        return true;
      }

      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }),
});
