import { ConsumeMessage } from "amqplib";
import RabbitMQ from "../../../frameworks/rabbitmq/connection";


(async function () {
    console.log(`[x] Deliver Service ready to consume [PAYMENT_SUCCESS_EXCHANGE]`);

    const channel = await RabbitMQ.getChannel();
    channel.assertExchange('PAYMENT_SUCCESS_EXCHANGE', 'fanout');
    channel.assertQueue('PAYMENT_SUCCESS_DELIVERY_QUEUE');
    channel.bindQueue('PAYMENT_SUCCESS_DELIVERY_QUEUE', 'PAYMENT_SUCCESS_EXCHANGE', '');

    channel.consume('PAYMENT_SUCCESS_DELIVERY_QUEUE', (msg: ConsumeMessage | null) => {
        if (!msg) return;

        // @ts-ignore
        const order = JSON.parse(msg.content as string);
        console.log("Processing Delivery of order: ", order.id);

        channel.assertExchange('SCHEDULED_DELIVERY_EXCHANGE', 'fanout');
        channel.publish('SCHEDULED_DELIVERY_EXCHANGE', '', Buffer.from(JSON.stringify({ order_id: order.id })));
        console.log("Preparing Delivery of order: ", order.id)

        channel.ack(msg);
    })
})()