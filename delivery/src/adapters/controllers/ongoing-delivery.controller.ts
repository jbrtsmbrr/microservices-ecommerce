import { Request, Response } from "express";
import { IOngoingDeliveryUseCase } from "../../application/use-cases/IOngoingDeliveryUseCase";

export default class OngoingDeliveryController {

  constructor(private readonly _ongoing_delivery: IOngoingDeliveryUseCase) { }

  public async handle(req: Request, res: Response) {
    const { orders } = req.body as { orders?: string[] } ?? {};

    if (!orders) {
      res.status(400).json({
        errors: [{ message: 'Orders are required.' }],
        success: false
      })
      return;
    }

    if (!Array.isArray(orders)) {
      res.status(400).json({
        errors: [{ message: 'Orders wrong format' }],
        success: false
      })
      return;
    }

    await this._ongoing_delivery.execute(orders);

    res.status(200).json({
      errors: [],
      success: true
    })
  }
}