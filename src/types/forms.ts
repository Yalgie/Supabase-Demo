import { z } from "zod";

export const emailFormSchema = z.object({
  email: z.string().email(),
});

export const codeFormSchema = z.object({
  code: z.string().length(6),
});

export const todoFormSchema = z.object({
  content: z.string(),
});

export type EmailSchema = z.infer<typeof emailFormSchema>;

export type CodeSchema = z.infer<typeof codeFormSchema>;

export type TodoSchema = z.infer<typeof todoFormSchema>;
