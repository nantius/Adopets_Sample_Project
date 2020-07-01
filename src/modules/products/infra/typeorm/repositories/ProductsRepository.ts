import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductsDTO from '@modules/products/dtos/IFindProductsDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(data: IFindProductsDTO): Promise<Product[] | undefined> {
    const { category, description, name, take, skip } = data;
    const productsQuery = await this.ormRepository.createQueryBuilder(
      'products',
    );
    if (category) {
      productsQuery.where(' products.category LIKE :q ', {
        q: `%${category}%`,
      });
    }
    if (description) {
      productsQuery.where(' products.description LIKE :q ', {
        q: `%${description}%`,
      });
    }
    if (name) {
      productsQuery.where(' products.name LIKE :q ', {
        q: `%${name}%`,
      });
    }
    if (take) {
      productsQuery.take(take);
    }
    if (skip) {
      productsQuery.skip(skip);
    }
    return productsQuery.getMany();
  }

  public async findByUuid(uuid: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(uuid);
    return product;
  }

  public async findByCategory(category: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { category } });
    return product;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(uuid: string): Promise<void> {
    await this.ormRepository.delete(uuid);
  }
}

export default ProductsRepository;
