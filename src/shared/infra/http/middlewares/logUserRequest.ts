import { Request, Response, NextFunction } from 'express';
import UserLogsRepository from '@shared/infra/typeorm/repositories/UserLogsRepository';

export default async function logUserRequest(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const userlog = new UserLogsRepository();
  const { uuid } = request.user;
  const { baseUrl, method } = request;
  await userlog.create({ user_id: uuid, route: baseUrl, action: method });
  next();
}
