import type { Response } from 'express';

import AppError from '../core/util/app-error';

/**
 * Options object parameters for sending error responses.
 *
 * @param res - The Express response object to send the error through.
 * @param error - An instance of AppError containing error details.
 */
interface Params {
  res: Response;
  error: AppError;
}

/**
 * Determines the error message based on the status code and error details.
 *
 * @param error - An instance of AppError.
 * @returns A string representing the error message.
 */
function determineErrorMessage(error: AppError): string {
  if (error.statusCode === 500) {
    return 'Internal Server Error';
  } else if (error.statusCode === 404) {
    return 'Not Found';
  } else if (error.statusCode === 400 && (!error.title || !error.message)) {
    return 'Bad Request';
  } else if (error.statusCode === 429) {
    return 'Too Many Requests for Wallet. Try Again Later.';
  } else {
    return `${error.title} ${error.message}`;
  }
}

/**
 * Sends an error response conforming to the JSON API structure.
 *
 * @param param0 - The response object and error details.
 * @returns An Express response with the error message.
 */
const sendError = ({ res, error }: Params) => {
  const message = determineErrorMessage(error);
  return res.status(error.statusCode).send({ message });
};

export default sendError;
