import { ConsumeMessage } from "amqplib";
import RabbitMQ from "../../../../frameworks/rabbitmq/connection";
import { IConsumer } from "../../../../application/interfaces/services/IConsumer";
import { IUpdateOrderUseCase } from "../../../../application/use-cases/interfaces/IUpdateOrderUseCase";

export default class OrderFailedConsumer implements IConsumer {

    constructor(private readonly update_order: IUpdateOrderUseCase) { }

    async startConsuming(/* prefetch: number ?? */) {
        const connection = await RabbitMQ.getConnection();
        const channel = await connection.createChannel();
        const channel_2 = await connection.createChannel();

        await channel.assertQueue('test_queue', { durable: false })
        await channel.assertExchange('ORDER_FAILED_EXCHANGE', 'fanout', { durable: false });
        await channel.bindQueue('test_queue', 'ORDER_FAILED_EXCHANGE', '')

        await channel_2.assertQueue('test_queue_2', { durable: false });
        await channel_2.bindQueue('test_queue_2', 'ORDER_FAILED_EXCHANGE', '');

        channel_2.consume('test_queue_2', async (msg) => {
            console.log('Comsume new message but didn\'t acknowledge');
        })

        // // This allows the consumer to handle only 1 process at time.
        // channel.prefetch(1);
        // // Establish a Queue (if queue haven't established yet).
        // channel.assertQueue('ORDER_FAILED', { durable: false });
        // // Start consuming a message from queue.
        channel.consume('test_queue', async (msg) => {
            if (!msg) return;

            const { updated_entries } = await this.update_order.execute("67e946283efcc5ff1b7278e0", "FAILED");

            console.log("[x] Order Updated");
            // if (updated_entries > 0)
            // setTimeout(() => {
            channel.ack(msg)
            // }, 4000)
        });

        console.log(`Order Failed Consumer Listening...`)
    }
}