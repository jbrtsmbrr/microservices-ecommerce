import { ProductDetails, ProductObject } from "../../usecases/interfaces/common";
import { Conditions } from "./common";

export interface IProductRepository {
    findAll(): Promise<ProductObject[]>;
    find(params: Conditions<ProductObject>): Promise<ProductObject | null>;
    save(product: ProductDetails): Promise<ProductObject | null>;
}