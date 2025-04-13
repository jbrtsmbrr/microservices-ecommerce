import { UpdateOrderStatusUseCase } from "../../../../application/use-cases/update-order-status.usecase";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection"
import { OrderRepository } from "../../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order = new UpdateOrderStatusUseCase(order_repository);

(async function () {
  const channel = await RabbitMQ.createChannel();
  const EXCHANGE = 'ORDER_PICKED_UP_EXCHANGE';
  const QUEUE = 'ORDER_PICKED_UP_QUEUE';
  channel.assertExchange(EXCHANGE, 'fanout');
  channel.assertQueue(QUEUE);
  channel.bindQueue(QUEUE, EXCHANGE, '');

  channel.consume(QUEUE, async (msg) => {
    console.log(`[x] Orders Picked-up!`)
    if (!msg) return;

    // @ts-ignore
    const { orders } = JSON.parse(msg.content) as { orders: string[] };

    const promises = orders.map((order) => update_order.execute(order, 'ORDER_PICKEDUP'));
    
    Promise.all(promises).then(() => channel.ack(msg));
  })
})()