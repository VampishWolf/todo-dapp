import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { routers } from '../../v1/routers';
import errorHandler from '../errorHandler';
import notFound from '../middleware/not-found';
import xst from '../middleware/xst';

/**
 * Creates an Express application.
 */
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(xst());
app.use(cors({ origin: '*' }));

// Health Check Before Logger To Prevent Spamming Logs In CloudWatch.
app.use('/api/health', (_, res) => res.status(200).send());
app.use(morgan('tiny'));

app.use('/api/v1/todos', routers.todo);

app.all('*', notFound());
app.use(errorHandler);

export default app;
