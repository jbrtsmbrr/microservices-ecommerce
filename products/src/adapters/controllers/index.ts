import { CreateProductUseCase } from "../../application/usecases/create-product.usecase";
import { GetProductsUseCase } from "../../application/usecases/get-all-products.usecase";
import { ProductRepository } from "../persistence/product-repository";
import { CreateProductController } from "./create-product.controller";
import { GetProductsController } from "./get-all-products.controller";

// Repositories
const products_repository = new ProductRepository();

// Use cases
const get_all_usecase = new GetProductsUseCase(products_repository);
const create_product_usecase = new CreateProductUseCase(products_repository);

// Controllers
export const all_products_controller = new GetProductsController(get_all_usecase);
export const create_product_controller = new CreateProductController(create_product_usecase);