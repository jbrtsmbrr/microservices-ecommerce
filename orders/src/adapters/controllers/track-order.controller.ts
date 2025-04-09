import { Request, Response } from "express";
import { IGetOrderUseCase } from "../../application/use-cases/interfaces/IGetOrderUseCase";

export class TrackOrderController {

    constructor(private readonly _get_order: IGetOrderUseCase) { }

    public async handle(req: Request, res: Response) {
        const { order_id } = req.query as { order_id: string };

        try {

            if (!order_id)
                throw new Error(`Missing order_id`)

            const order = await this._get_order.execute({ id: order_id });

            res.status(200).json({
                errors: [],
                success: !!order,
                data: { order }
            });

        } catch {
            res.status(400).json({
                errors: [{ message: 'Please provide order to track' }],
                success: false,
                data: null
            })
        }
    }
}