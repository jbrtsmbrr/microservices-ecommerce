import { Request, Response } from "express";
import PickupOrdersUseCase from "../../application/use-cases/pickup-orders.usecase";

export default class PickupOrdersController {

  constructor(private readonly _pickup_usecase: PickupOrdersUseCase) {}

  public async handle(req: Request, res: Response) {
    const { orders } = req.body as { orders?: string[] } ?? {};

    if (!orders) {
      res.status(400).json({
        errors: [{ field: 'orders', message: 'Orders are required.' }]
      });

      return 
    }

    if (!Array.isArray(orders)) {
      res.status(400).json({
        errors: [{ field: 'orders', message: 'Unable to process unknown format of orders.' }]
      });

      return
    }

    this._pickup_usecase.execute(orders)

    res.status(200).json({
      error: [],
      message: 'Orders marked as pickup'
    })
  }
}