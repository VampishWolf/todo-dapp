import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join('.');
  return `${pathString}: ${message}`;
};

// Format the Zod error message with only the current error
const formatZodError = (error: ZodError): string => {
  const { issues } = error;
  if (issues.length) return formatZodIssue(issues[0]);
  return 'Unknown validation error';
};

/**
 * Allows to perform a customized validation with zod.
 *
 * @param schema - Zod schema.
 * @returns Express Validation function callback.
 */
const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      console.info(
        `[system] Request validated successfully for ${req.method} ${req.url}`,
      );

      return next();
    } catch (error) {
      if (error instanceof ZodError)
        return res.status(422).send({ error: formatZodError(error) });

      return res.status(422).send({ error: 'Unknown validation error' });
    }
  };

export default validate;
