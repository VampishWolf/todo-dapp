import { Server } from 'http';
import toobusy from 'toobusy-js';

/**
 * Gracefully shuts down the application server.
 *
 * @param server - Node.js server.
 * @param signal - Signal to be placed in standard output.
 * @param code - Exit error code.
 */
export function shutdownServer(server: Server, signal: string, code: number) {
  const stoppingInfrastructures = [toobusy.shutdown()];

  // Shuts down the server, then synchronously stop the infrastructure.
  console.info(`Received ${signal}. Shutting down gracefully.`);
  server.close(() => {
    Promise.all(stoppingInfrastructures)
      .then(() => {
        console.info(`Server has closed due to ${signal} signal.`);
        process.exit(code);
      })
      .catch((err) => {
        console.error('Failed to shut down infrastructures due to an error.');
        console.error(err);
        process.exit(1);
      });
  });

  // If fail to shut down in time (30 secs), forcefully shutdown.
  setTimeout(() => {
    console.error('Graceful shutdown timeout, forcing exit.');
    process.exit(1);
  }, 30000);
}
