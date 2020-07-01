import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequestDTO {
  category?: string;
  name?: string;
  description?: string;
  take?: number;
  skip?: number;
}

@injectable()
class FindProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Product[] | undefined> {
    const products = await this.productsRepository.findAll(data);
    return products;
  }
}
export default FindProductService;
