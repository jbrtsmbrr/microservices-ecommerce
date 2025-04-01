import { UpdateOrderUseCase } from "../../../application/use-cases/update-order.usecase";
import OrderFailedConsumer from "./consumers/order-failed.consumer";

const update_order_usecase = new UpdateOrderUseCase();

const order_failed_consumer = new OrderFailedConsumer(update_order_usecase);

export function StartConsumers() {
    order_failed_consumer.startConsuming();
}