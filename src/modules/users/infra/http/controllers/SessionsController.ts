import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LoginUserService from '@modules/users/services/LoginUserService';
import LogoutUserService from '@modules/users/services/LogoutUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginUser = container.resolve(LoginUserService);
    const { token, user } = await loginUser.execute({ email, password });
    delete user.password;
    return response.json({ user, token });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;
    const logoutUser = new LogoutUserService();
    await logoutUser.execute({ tokenProvided: authHeader });
    return response.status(204).json();
  }
}
