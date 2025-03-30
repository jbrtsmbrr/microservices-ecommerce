import { Request, Response } from "express";
import { IGetProductsUseCase } from "../../application/usecases/interfaces/IGetProductsUseCase";

export class GetProductsController {
    constructor(private readonly _get_products: IGetProductsUseCase) { }

    public async handle(req: Request, res: Response) {
        const products = await this._get_products.execute();

        res.json(products)
    }
}