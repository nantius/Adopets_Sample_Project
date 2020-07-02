import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import logUserRequest from '@shared/infra/http/middlewares/logUserRequest';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);
productsRouter.use(logUserRequest);

productsRouter.get('/', productsController.index);
productsRouter.post('/', productsController.create);
productsRouter.put('/:uuid', productsController.update);
productsRouter.delete('/:uuid', productsController.delete);

export default productsRouter;
