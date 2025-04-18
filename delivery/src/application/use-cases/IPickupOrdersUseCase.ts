export default interface IPickupOrdersUseCase {
  execute(orders: string[]): Promise<void>;
}