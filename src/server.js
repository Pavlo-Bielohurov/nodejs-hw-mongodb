import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFaundHandler } from './middlewares/notFaundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.use(logger);

  app.use(router);

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFaundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => console.log(`Server is running on ${PORT} PORT`));
};
