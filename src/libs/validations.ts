import * as z from 'zod';
export const SigninSchema = z.object({
  username: z.string().min(3).max(7),
  password: z.string().min(3).max(15)
});
export const SignupSchema = z.object({
  username: z.string().min(3).max(7),
  password: z.string().min(3).max(15),
  email: z.email()
});
export const TaskSchema = z.object({
  id: z.number().min(0),
  title: z.string(),
  description: z.string().optional()
})
export const GoalCreateSchema = z.object({
  title: z.string().min(10, {message: "It should be minimum 10 characters"}).max(60, {message: "It can't be more than 60 characters"}),
  // TODO: make this below description field, optional 
  description: z.string().min(10, {message: "It should be minimum 10 characters"}).max(500, {message: "It can't be more than 500 characters"}),
  journey: z.object({
    start: z.string(),
    end: z.string(),
    skips: z.object({
      onWeeks: z.array(z.number()).max(4),
      onEvents: z.array(z.string())
    })
  }),
  tasklist: z.array(TaskSchema),
});