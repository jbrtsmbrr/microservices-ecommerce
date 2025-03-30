import { IProductRepository } from "../interfaces/persistence/IProductRepository";
import { IGetProductsUseCase } from "./interfaces/IGetProductsUseCase";

export class GetProductsUseCase implements IGetProductsUseCase {
    constructor(private readonly _product_repository: IProductRepository) { }
    public async execute() {
        const products = await this._product_repository.findAll();

        return { products };
    }
}