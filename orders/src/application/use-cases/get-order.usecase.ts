import { IOrderRepository } from "../interfaces/persistence/IOrderRepository";
import { OrderObject } from "./interfaces/common";
import { IGetOrderParams, IGetOrderUseCase } from "./interfaces/IGetOrderUseCase";

export class GetOrderUseCase implements IGetOrderUseCase {

    constructor(private readonly _order_repository: IOrderRepository) {}

    public async execute(conditions: IGetOrderParams): Promise<OrderObject | null> {
        return this._order_repository.findOne(conditions);
    }
}