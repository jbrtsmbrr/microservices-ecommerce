import { UpdateOrderStatusUseCase } from "../../../../application/use-cases/update-order-status.usecase";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection";
import { OrderRepository } from "../../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order = new UpdateOrderStatusUseCase(order_repository);

(async function () {
    const channel = await RabbitMQ.createChannel();
    channel.assertExchange('ONGOING_DELIVERY_EXCHANGE', 'fanout')
    channel.assertQueue('ON_GOING_DELIVERY_QUEUE');
    channel.bindQueue('ON_GOING_DELIVERY_QUEUE', 'ONGOING_DELIVERY_EXCHANGE', '');

    channel.consume('ON_GOING_DELIVERY_QUEUE', async (msg) => {
        if (!msg) return;

        // @ts-ignore
        const { orders } = JSON.parse(msg.content as string) as { orders: string[] };

        for (let order of orders) {
            await update_order.execute(order, 'ON_GOING_DELIVERY');
        }

        channel.ack(msg);
    })
})();