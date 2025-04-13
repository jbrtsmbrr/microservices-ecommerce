import { UpdateOrderStatusUseCase } from "../../../../application/use-cases/update-order-status.usecase";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection";
import { OrderRepository } from "../../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order = new UpdateOrderStatusUseCase(order_repository);

(async function () {
  const queue = 'ORDER_DELIVERED_QUEUE';
  const exchange = 'ORDER_DELIVERED_EXCHANGE';

  const channel = await RabbitMQ.createChannel();
  channel.assertQueue(queue);
  channel.assertExchange(exchange, 'fanout');
  channel.bindQueue(queue, exchange, '');
  channel.consume(queue, async (msg) => {
    if (!msg) return;
    
    // @ts-ignore
    const payload = JSON.parse(msg.content) as { 
      order: string,
      pod: string,
      courier: string
    }

    update_order.execute(payload.order, 'COMPLETED');
    console.log(`Order ${payload.order} is delivered.`)
  })
})()