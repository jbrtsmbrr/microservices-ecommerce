import { OrderStatus } from "./common";

export interface IUpdateOrderUseCase {
    execute(order_id: string, status: OrderStatus): Promise<{ updated_entries: number}>;
}