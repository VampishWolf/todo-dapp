import { Router } from 'express';

import bodyParser from '../../core/middleware/body-parser';
import asyncHandler from '../../core/util/async-handler';
import validate from '../../util/validate';
import { ToDoController } from './controller';
import ToDoValidation from './validation';

const ToDoRouter = () => {
  const router = Router();

  router.get(
    '/',
    validate(ToDoValidation.getToDos),
    asyncHandler(ToDoController.getToDos.bind(ToDoController)),
  );

  router.get(
    '/:id',
    validate(ToDoValidation.getToDoById),
    asyncHandler(ToDoController.getToDoById.bind(ToDoController)),
  );

  router.post(
    '/',
    bodyParser,
    validate(ToDoValidation.createToDo),
    asyncHandler(ToDoController.createToDo.bind(ToDoController)),
  );

  router.put(
    '/:id',
    bodyParser,
    validate(ToDoValidation.updateToDo),
    asyncHandler(ToDoController.updateToDo.bind(ToDoController)),
  );

  router.delete(
    '/:id',
    validate(ToDoValidation.deleteToDo),
    asyncHandler(ToDoController.deleteToDo.bind(ToDoController)),
  );

  return router;
};

export default ToDoRouter;
