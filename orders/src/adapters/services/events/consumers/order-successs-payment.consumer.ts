import { OrderObject } from "../../../../application/use-cases/interfaces/common";
import { UpdateOrderStatusUseCase } from "../../../../application/use-cases/update-order-status.usecase";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection"
import { OrderRepository } from "../../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order = new UpdateOrderStatusUseCase(order_repository);

(async function () {
  console.log(`[x] Order Service Listening to payment success...`)
  const channel = await RabbitMQ.createChannel();

  channel.assertQueue('PAYMENT_SUCCESS_ORDER_QUEUE')
  channel.assertExchange('PAYMENT_SUCCESS_EXCHANGE', 'fanout');
  channel.bindQueue('PAYMENT_SUCCESS_ORDER_QUEUE', 'PAYMENT_SUCCESS_EXCHANGE', '');

  channel.consume('PAYMENT_SUCCESS_ORDER_QUEUE', async (msg) => {
    if (!msg) return;

    // @ts-ignore
    const data: OrderObject = JSON.parse(msg.content);

    console.log(`[x] Order Service received successful payment for order: ${data.id}`);
    try {
      await update_order.execute(data.id, "PREPARING");
      channel.ack(msg);
    } catch {
      console.log("catched")
      channel.nack(msg);
    }
  });

})()