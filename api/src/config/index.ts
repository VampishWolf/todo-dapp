import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Allow environment variables from a file for development.
dotenv.config({ path: path.join(__dirname, '../..', '.env') });

/**
 * All configuration values of this application from the environment variables.
 * Intentionally spaced so it is easier to read and find out what is related with what.
 */
const configSchema = z.object({
  // Environment variables. ====================================================
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  INTERNAL_ENV: z
    .enum(['local', 'staging', 'production', 'test'])
    .default('local'),
  PORT: z.string().default('7979').transform(Number),
  ORIGIN: z
    .string()
    .default('*')
    .transform((s) => s.split(',')),
  // ===========================================================================
});

export default Object.freeze(configSchema.parse(process.env));
