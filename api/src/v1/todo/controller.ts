import type { Request, Response } from 'express';

import {
  CreateToDoValidationType,
  GetToDosValidationType,
  UpdateToDoValidationType,
} from './validation';

// Prisma
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();


// interface ToDo {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: Date;
//   priority: 'low' | 'medium' | 'high';
//   completed: boolean;
// }

class ToDoControllerHandler {
  // private todos: Map<string, ToDo> = new Map();

  public async getToDos(
    req: Request<unknown, unknown, unknown, GetToDosValidationType['query']>,
    res: Response,
  ) {
    const { page, limit } = req.query;
    const start = (page - 1) * limit;
    // const end = start + limit;

    // const todosArray = Array.from(this.todos.values());
    // const paginatedToDos = todosArray.slice(start, end);

    // return res.status(200).json({
    //   data: paginatedToDos,
    //   page,
    //   limit,
    //   total: this.todos.size,
    // });
    try {
      const todos = await prisma.todo.findMany({
        skip: start,
        take: limit,
      });
      const total = await prisma.todo.count();

      return res.status(200).json({
        data: todos,
        page,
        limit,
        total,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching ToDos' });
    }
  }

  public async getToDoById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    // const todo = this.todos.get(id);

    // if (!todo) {
    //   return res.status(404).json({ message: 'ToDo not found' });
    // }

    // return res.status(200).json(todo);
    try {
      const todo = await prisma.todo.findUnique({ where: { id } });

      if (!todo) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching ToDo' });
    }
  }

  public async createToDo(
    req: Request<unknown, unknown, CreateToDoValidationType['body']>,
    res: Response,
  ) {
    const { title, description, dueDate, priority } = req.body;

    // this.todos.set(newToDo.id, newToDo);

    // return res.status(201).json(newToDo);

    try {
      const newToDo = await prisma.todo.create({
        data: {
          id: randomUUID(),
          title,
          description,
          dueDate: new Date(dueDate),
          priority,
          completed: false,
        },
      });

      return res.status(201).json(newToDo);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating ToDo' });
    }
  }

  public async updateToDo(
    req: Request<{ id: string }, unknown, UpdateToDoValidationType['body']>,
    res: Response,
  ) {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    // const todo = this.todos.get(id);

    // if (!todo) {
    //   return res.status(404).json({ message: 'ToDo not found' });
    // }

    // const updatedToDo = {
    //   ...todo,
    //   title,
    //   description,
    //   dueDate: new Date(dueDate),
    //   priority,
    //   completed,
    // };

    // this.todos.set(id, updatedToDo);

    // return res.status(200).json(updatedToDo);
    try {
      const updatedToDo = await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          dueDate: new Date(dueDate),
          priority,
          completed,
        },
      });

      return res.status(200).json(updatedToDo);
    } catch (error: any) {
      if (error.code === 'P2025') { // Prisma's record not found error
        return res.status(404).json({ message: 'ToDo not found' });
      }
      return res.status(500).json({ error: 'Error updating ToDo' });
    }
  }

  public async deleteToDo(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    // if (!this.todos.has(id)) {
    //   return res.status(404).json({ message: 'ToDo not found' });
    // }

    // this.todos.delete(id);

    // return res.status(204).send();
    try {
      await prisma.todo.delete({ where: { id } });

      return res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'ToDo not found' });
      }
      return res.status(500).json({ error: 'Error deleting ToDo' });
    }
  }
}

export const ToDoController = new ToDoControllerHandler();
