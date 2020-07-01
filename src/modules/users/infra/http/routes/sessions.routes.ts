import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.delete('/', sessionsController.delete);

export default sessionsRouter;
