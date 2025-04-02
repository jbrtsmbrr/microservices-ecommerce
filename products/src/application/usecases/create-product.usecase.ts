import { IProductRepository } from "../interfaces/persistence/IProductRepository";
import { ProductDetails, ProductObject } from "./interfaces/common";
import { ICreateProductUseCase } from "./interfaces/ICreateProductUseCase";

export class CreateProductUseCase implements ICreateProductUseCase {
    constructor(private readonly _product_repository: IProductRepository) { }
    public async execute(params: ProductDetails): Promise<ProductObject | null> {
        const inserted_product = await this._product_repository.save(params);

        return inserted_product
    }
}