import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import redis from 'redis';
import JWTRedis from 'jwt-redis/build/JWTRedis';

interface ITokenPayload {
  jti: string;
  iat: number;
  exp: number;
  sub: string;
}

interface IRequestDTO {
  tokenProvided: string | undefined;
}

class LogoutUserService {
  public async execute({ tokenProvided }: IRequestDTO): Promise<void> {
    const redisClient = redis.createClient();
    const jwtr = new JWTRedis(redisClient);
    const { secret } = authConfig.jwt;

    if (!tokenProvided) {
      throw new AppError('JWT token is missing', 400);
    }
    const [, token] = tokenProvided.split(' ');

    try {
      const { jti } = await jwtr.verify<ITokenPayload>(token, secret);
      await jwtr.destroy(jti);
    } catch {
      throw new AppError('Invalid JWT token', 400);
    }
  }
}
export default LogoutUserService;
