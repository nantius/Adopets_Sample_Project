import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import errorsRouter from './errors.routes';
import userLogsRouter from './userlogs.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/errors', errorsRouter);
routes.use('/userlogs', userLogsRouter);

export default routes;
