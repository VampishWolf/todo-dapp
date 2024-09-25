import { z } from 'zod';

const ToDoValidation = {
  getToDos: z.object({
    query: z.object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().default(10),
    }),
  }),

  getToDoById: z.object({
    params: z.object({
      // If fails throw Not Found Error
      id: z.string().uuid(),
    }),
  }),

  createToDo: z.object({
    body: z.object({
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      dueDate: z.coerce.date(),
      priority: z.enum(['low', 'medium', 'high']),
    }),
  }),

  updateToDo: z.object({
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
      title: z.string().min(1).max(255),
      description: z.string().min(1).max(255),
      dueDate: z.coerce.date(),
      priority: z.enum(['low', 'medium', 'high']),
      completed: z.boolean(),
    }),
  }),

  deleteToDo: z.object({
    params: z.object({ id: z.string().uuid() }),
  }),
};

export type CreateToDoValidationType = z.infer<
  typeof ToDoValidation.createToDo
>;
export type UpdateToDoValidationType = z.infer<
  typeof ToDoValidation.updateToDo
>;
export type DeleteToDoValidationType = z.infer<
  typeof ToDoValidation.deleteToDo
>;
export type GetToDosValidationType = z.infer<typeof ToDoValidation.getToDos>;

export default ToDoValidation;
