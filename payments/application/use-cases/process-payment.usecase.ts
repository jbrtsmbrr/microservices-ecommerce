import IPubSubPublisher from "../services/IPubSubPublisher";
import IProcessPaymentUseCase, { OrderDetails } from "./interfaces/IProcessPaymentUseCase";

export default class ProcessPaymentUseCase implements IProcessPaymentUseCase {

  constructor(private readonly _publisher: IPubSubPublisher) { }

  execute(params: OrderDetails): Promise<void> {
    this._publisher.publish('PAYMENT_SUCCESS', params);
    console.log(`[x] Payment Service now Processing order: ${params.id}`);
    // Payment process code here...
    console.log(`[x] Payment Service: Payment for order: ${params.id} successful.`);
    return Promise.resolve();
  }
}