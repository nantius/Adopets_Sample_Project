import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequestDTO {
  uuid: string;
  name: string;
  description: string;
  category: string;
  price: number;
  amount: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    uuid,
    name,
    amount,
    category,
    description,
    price,
  }: IRequestDTO): Promise<Product> {
    if (amount < 0) {
      throw new AppError(
        'Product cannot be updated to have a negative amount.',
      );
    }

    const product = await this.productsRepository.findByUuid(uuid);

    if (!product) {
      throw new AppError('Product does not exist.');
    }

    const editedProduct = Object.assign(product, {
      name,
      amount,
      category,
      description,
      price,
    });

    const returnProduct = await this.productsRepository.save(editedProduct);

    return returnProduct;
  }
}
export default UpdateProductService;
