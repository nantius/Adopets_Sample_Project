import { uuid as uuidv4 } from 'uuidv4';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductsDTO from '@modules/products/dtos/IFindProductsDTO';
import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(data: IFindProductsDTO): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findByUuid(uuid: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.uuid === uuid);

    return findProduct;
  }

  public async findByCategory(category: string): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.category === category,
    );

    return findProduct;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { uuid: uuidv4() }, productData);
    this.products.push(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProducts => findProducts.uuid === product.uuid,
    );
    this.products[findIndex] = product;
    return product;
  }

  public async delete(uuid: string): Promise<void> {
    const findIndex = this.products.findIndex(
      findProducts => findProducts.uuid === uuid,
    );
    this.products.splice(findIndex, 1);
  }
}

export default FakeProductsRepository;
