import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { db } from "@/utils/db";

export const todoRouter = router({
  getTodos: protectedProcedure.query(async (opts) => {
    const { ctx } = opts;
    const { sub } = ctx.user;

    const todos = await db.todo.findMany({
      where: {
        authorId: sub,
      },
      // include: {
      //   author: true,
      // },
    });

    return todos;
  }),
  createTodo: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const { content } = input;
      const { sub } = ctx.user;

      await db.todo.create({
        data: {
          authorId: sub,
          content,
        },
      });

      return true;
    }),
  toggleTodo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        completed: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const { id, completed } = input;
      const { sub } = ctx.user;

      await db.todo.update({
        where: {
          authorId: sub,
          id,
        },
        data: {
          authorId: sub,
          completed,
        },
      });

      return true;
    }),
  deleteTodo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { ctx, input } = opts;
      const { id } = input;
      const { sub } = ctx.user;

      await db.todo.delete({
        where: {
          authorId: sub,
          id,
        },
      });

      return true;
    }),
});
