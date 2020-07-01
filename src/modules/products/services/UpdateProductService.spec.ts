import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

let updateProduct: UpdateProductService;
let createProduct: CreateProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProduct = new UpdateProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to edit a product', async () => {
    const product = await createProduct.execute({
      name: 'test',
      amount: 1,
      category: 'test category',
      description: 'test description',
      price: 20,
    });

    const editedProduct = await updateProduct.execute({
      uuid: product.uuid,
      category: 'updated category',
      amount: 2,
      description: 'updated description',
      price: 25,
      name: 'updated name',
    });

    expect(editedProduct.category).toBe('updated category');
    expect(editedProduct.amount).toBe(2);
  });

  it('should not be able to edit a non-existing product ', async () => {
    await expect(
      updateProduct.execute({
        uuid: 'nonexistinguuid',
        category: 'updated category',
        amount: 2,
        description: 'updated description',
        price: 25,
        name: 'updated name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to edit a product to have a negative amount', async () => {
    const product = await createProduct.execute({
      name: 'test',
      amount: 1,
      category: 'test category',
      description: 'test description',
      price: 20,
    });

    await expect(
      updateProduct.execute({
        uuid: product.uuid,
        category: 'updated category',
        amount: -1,
        description: 'updated description',
        price: 25,
        name: 'updated name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
