import app from './core/express/app';
import { startServer } from './core/express/start-server';

void (() => {
  try {
    startServer(app);
  } catch (err) {
    console.error(err);
    console.error(`Exec file error.`);
  }
})();
