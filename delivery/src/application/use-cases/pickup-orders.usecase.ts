import { IPublisher } from "../../adapters/events/PublisherFactory";
import IPickupOrdersUseCase from "./IPickupOrdersUseCase";

export default class PickupOrdersUseCase implements IPickupOrdersUseCase {

  constructor(private readonly _publisher: IPublisher) { }

  public async execute(orders: string[]): Promise<void> {

    // Publishes events 
    this._publisher.publish('ORDER_PICKED_UP_EXCHANGE', { orders });
  }
}