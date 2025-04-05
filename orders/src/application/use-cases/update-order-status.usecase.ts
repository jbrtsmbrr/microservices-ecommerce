import { IOrderRepository } from "../interfaces/persistence/IOrderRepository";
import { OrderStatus } from "./interfaces/common";
import { IUpdateOrderStatusUseCase, } from "./interfaces/IUpdateOrderStatusUseCase";

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {

  constructor(private readonly _order_repository: IOrderRepository) { }

  public async execute(order_id: string, status: OrderStatus): Promise<{ updated_entries: number }> {
    const order = await this._order_repository.findOne({ id: order_id })

    // Publish an event depending on status

    if (!order)
      throw new Error(`Unable to find order: ${order_id}`);

    const { affected_entries } = await this._order_repository.updateOne({ id: order_id, status: status });

    if (status === 'PREPARING') {
      // publish preparing
    }


    return {
      updated_entries: affected_entries
    }
  }
}