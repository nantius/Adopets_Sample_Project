import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequestDTO {
  uuid: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ uuid }: IRequestDTO): Promise<void> {
    const product = await this.productsRepository.findByUuid(uuid);
    if (!product) {
      throw new AppError('Product does not exist.');
    }
    await this.productsRepository.delete(uuid);
  }
}
export default DeleteProductService;
