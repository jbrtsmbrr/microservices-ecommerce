import { Request, Response } from "express";
import { ICreateProductUseCase } from "../../application/usecases/interfaces/ICreateProductUseCase";

export class CreateProductController {
    constructor(private readonly _create_product: ICreateProductUseCase) { }

    public async handle(req: Request, res: Response) {
        const params = req.body as { name?: string; description?: string; price?: number }

        if (!params.name || !params.description || !params.price) {
            res.status(400).json({
                errors: [{ message: 'Please enter the necessary values' }],
                success: false,
                data: null
            });
            return;
        }

        const inserted_product = await this._create_product.execute({
            description: params.description!,
            name: params.name!,
            price: params.price!
        });

        res.status(201).json({
            errors: [],
            success: true,
            data: { product: inserted_product }
        })
    }
}