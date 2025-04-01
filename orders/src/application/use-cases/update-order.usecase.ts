import { OrderStatus } from "./interfaces/common";
import { IUpdateOrderUseCase } from "./interfaces/IUpdateOrderUseCase";

export class UpdateOrderUseCase implements IUpdateOrderUseCase {
    public async execute(order_id: string, status: OrderStatus): Promise<{ updated_entries: number }> {
        return {
            updated_entries: 0
        }
    }
}