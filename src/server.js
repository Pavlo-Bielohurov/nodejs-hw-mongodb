import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';

import { notFaundHandler } from './middlewares/notFaundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    express.json({ type: ['application/json', 'application/vnd.api+json'] }),
  );

  app.use(logger);

  app.use(contactsRouter);

  app.use('*', notFaundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => console.log(`Server is running on ${PORT} PORT`));
};
