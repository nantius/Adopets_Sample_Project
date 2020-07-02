import { Router, Request, Response } from 'express';
import ErrorsRepository from '@shared/infra/typeorm/repositories/ErrorsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const errorsRouter = Router();

errorsRouter.use(ensureAuthenticated);

errorsRouter.get('/', async (request: Request, response: Response) => {
  const errorsRepository = new ErrorsRepository();
  const errors = await errorsRepository.findAll();
  return response.json(errors);
});

export default errorsRouter;
