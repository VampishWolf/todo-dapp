import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import config from '../../config';
import sendError from '../../util/send-error';
import AppError from '../util/app-error';

/**
 * Sends an API error response to the requesting client. In development
 * phase, the API will send back `stack` property in the response.
 *
 * @param req - Express.js's request object.
 * @param res - Express.js's response object.
 * @param err - Error object in the form of `AppError`.
 */
const sendErrorResponse = (_req: Request, res: Response, err: AppError) => {
  if (config.NODE_ENV === 'development') {
    sendError({ res, error: err });
    return;
  }
  /** Send error to client */
  sendError({ res, error: err });
};

/**
 * Handles errors for expected errors. Transforms most error objects into a readable format
 * which is `AppError`.
 *
 * @param err - The 'true' error which was thrown, casted to `any` as errors can take up many forms.
 * @returns A new error object that conforms to 'AppError'.
 */
const handleOperationalErrors = (req: Request, err: Error) => {
  if (config.NODE_ENV === 'development') console.error(err);

  // Handle body parser errors.
  if (err instanceof SyntaxError) {
    if (config.INTERNAL_ENV === 'staging')
      console.debug(`[system] Invalid JSON, request body: ${req.body}`);
    return new AppError('Invalid JSON! Please insert a valid one.', 400);
  }

  // @ts-expect-error: Some errors may have this `type` property!
  if (err.type === 'entity.too.large') {
    return new AppError('Request too large! Please reduce your payload!', 413);
  }

  // Handle validation errors.
  if (err instanceof ZodError) {
    if (err.errors) {
      return new AppError('Request contain unprocesable parameters!', 400);
    }
  }

  // If anything is not caught, then it is most likely an unknown error. We will
  // print the error to standard output and send back a generic `500` error.
  const { url, headers, method, httpVersion, originalUrl, query, body } = req;
  console.error(
    '[handleOperationalErrors] Internal server error',
    JSON.stringify({
      err,
      req: { url, headers, method, httpVersion, originalUrl, query, body },
    }),
  );
  return new AppError('Internal server error!', 500);
};

/**
 * Custom error handling middleware for Express.js.
 *
 * @param err - Error object.
 * @param req - Express.js's request object.
 * @param res - Express.js's response object.
 * @param next - Express.js's next function.
 */
const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Catch expected errors.
  if (err instanceof AppError) {
    sendErrorResponse(req, res, err);
    return;
  }

  // Fallback to this error if error is not an `AppError`. We will try
  // to check if it is an operational error or not.
  if (err instanceof Error) {
    sendErrorResponse(req, res, handleOperationalErrors(req, err));
    return;
  }

  // Otherwise, it is unexpected and should be handled properly in both environments by
  // transforming them into an instance of `AppError` and printing the stack trace properly.
  const error = new AppError('Unknown error! Please try again later!', 500);

  // Print both errors to standard output. This is considered a critical failure.
  console.error(err);
  console.error(error);

  // Send stack in development, do not send stack in production.
  sendErrorResponse(req, res, error);

  // Go next.
  next();
};

export default errorHandler;
