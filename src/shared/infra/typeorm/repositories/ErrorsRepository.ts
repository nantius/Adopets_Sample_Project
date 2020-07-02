import { getRepository, Repository } from 'typeorm';
import Error from '@shared/infra/typeorm/entities/Error';
import IErrorsRepository from '@shared/repositories/IErrorsRepository';
import ICreateErrorDTO from '@shared/dtos/ICreateErrorDTO';

class ErrorsRepository implements IErrorsRepository {
  private ormRepository: Repository<Error>;

  constructor() {
    this.ormRepository = getRepository(Error);
  }

  public async findAll(): Promise<Error[]> {
    const errors = this.ormRepository.find();
    return errors;
  }

  public async create(errorData: ICreateErrorDTO): Promise<Error> {
    const error = this.ormRepository.create(errorData);

    await this.ormRepository.save(error);
    return error;
  }

  public async save(error: Error): Promise<Error> {
    await this.ormRepository.save(error);
    return error;
  }
}

export default ErrorsRepository;
