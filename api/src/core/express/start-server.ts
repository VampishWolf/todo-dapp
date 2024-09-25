import express from 'express';

import config from '../../config';
import { shutdownServer } from './shutdown-server';

/**
 * Starts our server.
 */
export function startServer(app: express.Application) {
  // Handle uncaught exceptions to prevent app error before starting.
  process.on('uncaughtException', (err: Error) => {
    console.error('Unhandled exception 💥! Application shutting down!');
    console.error(
      `[unhandledRejection] ${err.name} ${err.message} ${err.stack}`,
    );
    process.exit(1);
  });

  // Prepare server.
  const server = app.listen(config.PORT, () => {
    console.info(
      `Api ready on port ${config.PORT} on mode ${config.NODE_ENV}!`,
    );
  });

  // Handle unhandled rejections, then shut down gracefully.
  process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled rejection 💥! Application shutting down!');
    console.error(
      `[unhandledRejection] ${err.name} ${err.message} ${err.stack}`,
    );

    // Finish all requests that are still pending, the shutdown gracefully.
    shutdownServer(server, 'unhandledRejection', 1);
  });

  // Handle signals: interrupts, quits, and terminates.
  process.on('SIGINT', () => shutdownServer(server, 'SIGINT', 0));
  process.on('SIGQUIT', () => shutdownServer(server, 'SIGQUIT', 0));
  process.on('SIGTERM', () => shutdownServer(server, 'SIGTERM', 0));
}
