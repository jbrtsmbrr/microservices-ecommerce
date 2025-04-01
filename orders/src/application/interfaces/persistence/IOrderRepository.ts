import { OrderDetails, OrderObject } from "../../use-cases/interfaces/common";

export interface IOrderRepository {
    save(order: OrderDetails): Promise<OrderObject | null>;
}