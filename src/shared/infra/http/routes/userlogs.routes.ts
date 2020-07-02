import { Router, Request, Response } from 'express';
import UserLogsRepository from '@shared/infra/typeorm/repositories/UserLogsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userLogsRouter = Router();

userLogsRouter.use(ensureAuthenticated);

userLogsRouter.get('/', async (request: Request, response: Response) => {
  const userlogsRepository = new UserLogsRepository();
  const userlogs = await userlogsRepository.findAll();
  return response.json(userlogs);
});

export default userLogsRouter;
