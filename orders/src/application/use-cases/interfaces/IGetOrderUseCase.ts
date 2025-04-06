import { OrderObject } from "./common";

export type IGetOrderParams = Partial<Omit<OrderObject, 'payment_method'>>;

export interface IGetOrderUseCase {
    execute(conditions: IGetOrderParams): Promise<OrderObject | null>;
}