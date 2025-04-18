export interface IOngoingDeliveryUseCase {
  execute(orders: string[]): Promise<void>;
}