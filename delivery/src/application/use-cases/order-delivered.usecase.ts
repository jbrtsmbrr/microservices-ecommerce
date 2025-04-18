import { IPublisher } from "../../adapters/events/PublisherFactory";
import IOrderDeliveredUseCase, { DeliveredOrderParams } from "./IOrderDeliveredUseCase";

export default class OrderDeliveredUseCase implements IOrderDeliveredUseCase {

  constructor(private readonly _publisher: IPublisher) {}

  public async execute(params: DeliveredOrderParams): Promise<void> {
    await this._publisher.publish('ORDER_DELIVERED_EXCHANGE', { 
      order: params.order_id,
      pod: params.proof_of_delivery,
      courier: params.courier_id
    });
  }
}