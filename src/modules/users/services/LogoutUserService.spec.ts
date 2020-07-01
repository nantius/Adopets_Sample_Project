import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import LoginUserService from './LoginUserService';
import LogoutUserService from './LogoutUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let loginUser: LoginUserService;
let logoutUser: LogoutUserService;
let createUser: CreateUserService;

describe('LogoutUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    loginUser = new LoginUserService(fakeUsersRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    logoutUser = new LogoutUserService();
  });

  it('should be able to logout a valid user', async () => {
    const user = await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    });

    const response = await loginUser.execute({
      email: 'test@test.com',
      password: '123456',
    });

    await expect(logoutUser.execute({ tokenProvided: response.token }))
      .resolves;
  });

  it('should not be able to logout an invalid token', async () => {
    await expect(
      logoutUser.execute({ tokenProvided: 'invalidtoken' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
