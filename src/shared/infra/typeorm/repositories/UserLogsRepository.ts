import { getRepository, Repository } from 'typeorm';
import UserLog from '@shared/infra/typeorm/entities/UserLog';
import IUserLogsRepository from '@shared/repositories/IUserLogsRepository';
import ICreateUserLogDTO from '@shared/dtos/ICreateUserLogDTO';

class UserLogsRepository implements IUserLogsRepository {
  private ormRepository: Repository<UserLog>;

  constructor() {
    this.ormRepository = getRepository(UserLog);
  }

  public async findAll(): Promise<UserLog[]> {
    const errors = this.ormRepository.find();
    return errors;
  }

  public async create(userLogData: ICreateUserLogDTO): Promise<UserLog> {
    const userlog = this.ormRepository.create(userLogData);

    await this.ormRepository.save(userlog);
    return userlog;
  }

  public async save(userlog: UserLog): Promise<UserLog> {
    await this.ormRepository.save(userlog);
    return userlog;
  }
}

export default UserLogsRepository;
