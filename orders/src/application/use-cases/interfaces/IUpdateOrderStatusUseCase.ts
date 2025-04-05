import { OrderStatus } from "./common";

export interface IUpdateOrderStatusUseCase {
  execute(order_id: string, status: OrderStatus): Promise<{ updated_entries: number }>;
}