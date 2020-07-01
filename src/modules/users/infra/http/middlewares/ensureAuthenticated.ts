import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import redis from 'redis';
import JWTRedis from 'jwt-redis/build/JWTRedis';

interface ITokenPayload {
  jti: string;
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = redis.createClient();
  const jwtr = new JWTRedis(redisClient);

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await jwtr.verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;
    request.user = {
      uuid: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
