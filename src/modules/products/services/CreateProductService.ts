import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequestDTO {
  name: string;
  description: string;
  category: string;
  price: number;
  amount: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    amount,
    category,
    description,
    price,
  }: IRequestDTO): Promise<Product> {
    if (amount < 0) {
      throw new AppError('Product cannot be registered with negative amount.');
    }

    const product = await this.productsRepository.create({
      name,
      amount,
      category,
      description,
      price,
    });
    return product;
  }
}
export default CreateProductService;
