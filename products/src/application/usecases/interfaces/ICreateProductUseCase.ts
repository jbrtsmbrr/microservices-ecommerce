import { ProductDetails, ProductObject } from "./common";

export interface ICreateProductUseCase {
    execute(params: ProductDetails): Promise<ProductObject | null>
}