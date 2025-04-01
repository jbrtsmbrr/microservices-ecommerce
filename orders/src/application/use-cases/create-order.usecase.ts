import { IPublisher } from "../interfaces/services/IPublisher";
import { IOrderRepository } from "../interfaces/persistence/IOrderRepository";
import { OrderDetails, OrderObject } from "./interfaces/common";
import { ICreateOrderUseCase } from "./interfaces/ICreateOrderUseCase";
import { PartialField } from "./types/utils";

export class CreateOrderUseCase implements ICreateOrderUseCase {
    constructor(
        private readonly _order_repository: IOrderRepository,
        private readonly _publisher: IPublisher
    ) { }

    public async execute(order_details: PartialField<OrderDetails, 'status'>): Promise<OrderObject | null> {
        console.log(order_details.products)
        const order = await this._order_repository.save({
            ...order_details,
            status: 'PENDING'
        });

        if (true) {
            this._publisher.publish("ORDER_FAILED", null)
            return null
        };

        await this._publisher.publish('ORDER_CREATED', order);

        return order;
    }
}