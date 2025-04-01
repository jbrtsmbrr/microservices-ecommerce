import { PartialField } from "../types/utils";
import { OrderDetails, OrderObject } from "./common";

export interface ICreateOrderUseCase {
    execute(order: PartialField<OrderDetails, 'status'>): Promise<OrderObject | null>
}