
export interface OrderDetails {
  id: string;
  products: Array<{
    product_id: string;
    quantity: number
  }>;
  status: string;
  customer_id: string;
  payment_method: string;

}

export default interface IProcessPaymentUseCase {
  execute(params: OrderDetails): Promise<void>;
}