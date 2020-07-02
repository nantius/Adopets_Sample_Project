import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import ErrorsRepository from '@shared/infra/typeorm/repositories/ErrorsRepository';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    const errorRepository = new ErrorsRepository();
    errorRepository
      .create({
        message: err.message,
        name: err.name,
        stack: err.stack,
      })
      .then(() => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      });
  },
);

app.listen(3333, () => console.log('Server started!'));
