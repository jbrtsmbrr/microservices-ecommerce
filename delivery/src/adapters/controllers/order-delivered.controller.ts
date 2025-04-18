import { Request, Response } from "express";
import IOrderDeliveredUseCase from "../../application/use-cases/IOrderDeliveredUseCase";

export class OrderDeliveredController {

  constructor(private readonly _order_delivered: IOrderDeliveredUseCase) { }

  public async handle(req: Request, res: Response) {
    const { order, courier, epod } = req.body as { order?: string; courier?: string; epod?: Blob; };

    if (!order || !courier || !epod) {
      res.status(400).json({
        errors: [{ message: 'Incomplete parameters' }],
        success: false
      })

      return;
    }

    await this._order_delivered.execute({
      order_id: order,
      courier_id: courier,
      proof_of_delivery: epod
    });

    res.status(200).json({
      errors: [],
      success: true
    })
  }
}