import { IPublisher } from "../../adapters/events/PublisherFactory";
import { IOngoingDeliveryUseCase } from "./IOngoingDeliveryUseCase";

export default class OngoingDeliveryUseCase implements IOngoingDeliveryUseCase {

  constructor(private readonly _publisher: IPublisher) {}

  public async execute(orders: string[]): Promise<void> {
    this._publisher.publish('ONGOING_DELIVERY_EXCHANGE', { orders })
  }
}