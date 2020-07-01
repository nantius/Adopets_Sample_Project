import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindProductService from '@modules/products/services/FindProductService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import IFindProductsDTO from '@modules/products/dtos/IFindProductsDTO';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      category,
      take,
      skip,
    }: IFindProductsDTO = request.query;

    const findProducts = container.resolve(FindProductService);
    const product = await findProducts.execute({
      name,
      description,
      category,
      take,
      skip,
    });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, category, price, amount } = request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      description,
      category,
      price,
      amount,
    });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, category, price, amount } = request.body;
    const { uuid } = request.params;

    const updateProduct = container.resolve(UpdateProductService);
    const updatedProduct = await updateProduct.execute({
      uuid,
      name,
      description,
      category,
      price,
      amount,
    });
    return response.json(updatedProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);
    const product = await deleteProduct.execute({
      uuid,
    });
    return response.status(204).json(product);
  }
}
