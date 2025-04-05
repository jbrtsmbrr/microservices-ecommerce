import { OrderDetails, OrderObject } from "../../use-cases/interfaces/common";
import { UpdateOrderParams } from "../../use-cases/interfaces/IUpdateOrderUseCase";

export interface IOrderRepository {
    save(order: OrderDetails): Promise<OrderObject | null>;
    findOne(order: Partial<Omit<OrderObject, 'payment_method'>>): Promise<OrderObject | null>;
    updateOne(order: UpdateOrderParams): Promise<{ affected_entries: number }>;
}