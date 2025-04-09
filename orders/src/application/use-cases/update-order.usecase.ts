import { IOrderRepository } from "../interfaces/persistence/IOrderRepository";
import { IUpdateOrderUseCase, UpdateOrderParams } from "./interfaces/IUpdateOrderUseCase";

export class UpdateOrderUseCase implements IUpdateOrderUseCase {

    constructor(private readonly _order_repository: IOrderRepository) { }

    public async execute(updated_order: UpdateOrderParams): Promise<{ updated_entries: number }> {
        const order = await this._order_repository.findOne({ id: updated_order.id })

        if (!order)
            throw new Error(`Unable to find order: ${updated_order.id}`);

        const { affected_entries } = await this._order_repository.updateOne(updated_order);

        return {
            updated_entries: affected_entries
        }
    }
}