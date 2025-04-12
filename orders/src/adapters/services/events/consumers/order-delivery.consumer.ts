import { UpdateOrderStatusUseCase } from "../../../../application/use-cases/update-order-status.usecase";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection";
import { OrderRepository } from "../../../persistence/OrderRepository";

const order_repository = new OrderRepository();
const update_order = new UpdateOrderStatusUseCase(order_repository);

(async function() {
    const channel = await RabbitMQ.createChannel();
    channel.assertQueue('DELIVERY_PREPARED_ORDER_QUEUE');
    channel.bindQueue('DELIVERY_PREPARED_ORDER_QUEUE', 'SCHEDULED_DELIVERY_EXCHANGE', '');

    channel.consume('DELIVERY_PREPARED_ORDER_QUEUE', async (msg) => {
        if (!msg) return;

        // @ts-ignore
        const { order_id } = JSON.parse(msg.content as string) as { order_id: string };

        update_order.execute(order_id, 'ON_GOING_DELIVERY');

        channel.ack(msg);
    })
})();