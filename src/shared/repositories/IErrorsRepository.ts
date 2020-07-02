import Error from '@shared/infra/typeorm/entities/Error';
import ICreateErrorDTO from '@shared/dtos/ICreateErrorDTO';

export default interface IProductsRepository {
  findAll(): Promise<Error[]>;
  create(data: ICreateErrorDTO): Promise<Error>;
  save(error: Error): Promise<Error>;
}
