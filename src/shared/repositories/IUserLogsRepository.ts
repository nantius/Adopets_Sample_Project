import UserLog from '@shared/infra/typeorm/entities/UserLog';
import ICreateUserLogDTO from '@shared/dtos/ICreateUserLogDTO';

export default interface IUserLogsRepository {
  findAll(): Promise<UserLog[]>;
  create(data: ICreateUserLogDTO): Promise<UserLog>;
  save(userlog: UserLog): Promise<UserLog>;
}
