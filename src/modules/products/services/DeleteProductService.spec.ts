import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

let createProduct: CreateProductService;
let deleteProduct: DeleteProductService;
let fakeProductsRepository: FakeProductsRepository;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const product = await createProduct.execute({
      name: 'test',
      amount: 1,
      category: 'test category',
      description: 'test description',
      price: 20,
    });

    await deleteProduct.execute({ uuid: product.uuid });
    const deletedProduct = await fakeProductsRepository.findByUuid(
      product.uuid,
    );
    expect(deletedProduct).toBeFalsy();
  });

  it('should not be able to delete a product that does not exist', async () => {
    await expect(
      deleteProduct.execute({ uuid: 'nonexistinguuid' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
