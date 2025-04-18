
export interface DeliveredOrderParams {
  order_id: string;         // Order that needs to be received
  proof_of_delivery: Blob;  // Courier's Proof of delivery
  courier_id: string;       // Person who delivers the package
}

export default interface IOrderDeliveredUseCase {
  execute(params: DeliveredOrderParams): Promise<void>;
}