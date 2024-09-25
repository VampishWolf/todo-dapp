import type { NextFunction, Request, Response } from 'express';

import AppError from '../util/app-error';

/**
 * Middleware to handle `404 Not Found` errors in API.
 *
 * @returns Closure to handle `404 Not Found` errors in API.
 */
const notFound = () => (_req: Request, _: Response, next: NextFunction) => {
  next(new AppError('Resource not found.', 404));
};

export default notFound;
