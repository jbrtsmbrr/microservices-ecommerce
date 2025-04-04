import { Request, Response } from "express";
import { ICreateOrderUseCase } from "../../application/use-cases/interfaces/ICreateOrderUseCase";
import { PaymentMethod } from "../../application/use-cases/interfaces/common";

interface OrderItem {
    product_id: string;
    quantity: number;
}

export class CreateOrderController {
    constructor(private readonly _create_order: ICreateOrderUseCase) { }

    public async handle(req: Request, res: Response) {
        const { customer, items, payment_method } = req.body as { customer?: string; items?: OrderItem[]; payment_method?: PaymentMethod }

        if (!customer || !items || !payment_method) {
            res.status(400).json({
                errors: [{ message: 'Please fillup the required fields' }],
                success: false,
                data: null
            });

            return;
        }

        const new_order = await this._create_order.execute({
            customer_id: customer,
            products: items,
            payment_method
        });

        if (!new_order) {
            res.status(400).json({
                errors: [{ message: 'Order not created!' }],
                success: false,
                data: null
            });

            return;
        }

        return res.status(201).json({
            errors: [],
            success: true,
            data: {
                order: new_order,
                message: 'Order Placed'
            }
        })
    }
}