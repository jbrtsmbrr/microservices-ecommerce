import { UpdateOrderUseCase } from "../../../application/use-cases/update-order.usecase";
import "./consumers/order-successs-payment.consumer";
import OrderFailedConsumer from "./consumers/order-failed.consumer";
import { OrderRepository } from "../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order_usecase = new UpdateOrderUseCase(order_repository);

const order_failed_consumer = new OrderFailedConsumer(update_order_usecase);

export function StartConsumers() {
    order_failed_consumer.startConsuming();
}