import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let createProduct: CreateProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a product', async () => {
    const product = await createProduct.execute({
      name: 'test',
      amount: 1,
      category: 'test category',
      description: 'test description',
      price: 20,
    });

    expect(product).toHaveProperty('uuid');
  });

  it('should not be able to create a product with an invalid amount', async () => {
    await expect(
      createProduct.execute({
        name: 'test',
        amount: -1,
        category: 'test category',
        description: 'test description',
        price: 20,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
