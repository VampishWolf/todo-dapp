import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';

import {
  CreateToDoValidationType,
  GetToDosValidationType,
  UpdateToDoValidationType,
} from './validation';

interface ToDo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

class ToDoControllerHandler {
  private todos: Map<string, ToDo> = new Map();

  public getToDos(
    req: Request<unknown, unknown, unknown, GetToDosValidationType['query']>,
    res: Response,
  ) {
    const { page, limit } = req.query;
    const start = (page - 1) * limit;
    const end = start + limit;

    const todosArray = Array.from(this.todos.values());
    const paginatedToDos = todosArray.slice(start, end);

    return res.status(200).json({
      data: paginatedToDos,
      page,
      limit,
      total: this.todos.size,
    });
  }

  public getToDoById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const todo = this.todos.get(id);

    if (!todo) {
      return res.status(404).json({ message: 'ToDo not found' });
    }

    return res.status(200).json(todo);
  }

  public createToDo(
    req: Request<unknown, unknown, CreateToDoValidationType['body']>,
    res: Response,
  ) {
    const { title, description, dueDate, priority } = req.body;

    const newToDo: ToDo = {
      id: randomUUID(),
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      completed: false,
    };

    this.todos.set(newToDo.id, newToDo);

    return res.status(201).json(newToDo);
  }

  public updateToDo(
    req: Request<{ id: string }, unknown, UpdateToDoValidationType['body']>,
    res: Response,
  ) {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const todo = this.todos.get(id);

    if (!todo) {
      return res.status(404).json({ message: 'ToDo not found' });
    }

    const updatedToDo = {
      ...todo,
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      completed,
    };

    this.todos.set(id, updatedToDo);

    return res.status(200).json(updatedToDo);
  }

  public deleteToDo(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!this.todos.has(id)) {
      return res.status(404).json({ message: 'ToDo not found' });
    }

    this.todos.delete(id);

    return res.status(204).send();
  }
}

export const ToDoController = new ToDoControllerHandler();
