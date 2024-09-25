import type { NextFunction, Request, Response } from 'express';

import AppError from '../util/app-error';

/**
 * Middleware to validate an api key sent in the headers of the request.
 *
 * @returns Closure to handle `404 Not Found` errors in API.
 */
const apiKeyValidator =
  (header: string, key: string) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.headers[header] || req.headers[header] !== key) {
      console.error(`Invalid ${header} header`);
      throw new AppError('Not Found', 404);
    }
    next();
  };

export default apiKeyValidator;
