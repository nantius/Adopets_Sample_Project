import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductsDTO from '../dtos/IFindProductsDTO';

export default interface IProductsRepository {
  findAll(data: IFindProductsDTO): Promise<Product[] | undefined>;
  findByUuid(uuid: string): Promise<Product | undefined>;
  findByCategory(category: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(uuid: string): Promise<void>;
}
