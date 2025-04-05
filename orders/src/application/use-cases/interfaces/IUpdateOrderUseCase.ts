import { OnlyRequired } from "../types/utils";
import { OrderObject } from "./common";

export type UpdateOrderParams = OnlyRequired<Omit<OrderObject, 'payment_method'>, 'id'>;
export interface IUpdateOrderUseCase {
    execute(order: UpdateOrderParams): Promise<{ updated_entries: number }>;
}