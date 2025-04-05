import { IPublisher } from "../../../application/interfaces/services/IPublisher";
import RabbitMQ from "../../../frameworks/rabbitmq/connection";


export class EventPublisher implements IPublisher {
    public async publish(topic: string, payload: any): Promise<void> {
        const channel = await RabbitMQ.createChannel();

        // channel.assertExchange('ORDER_FAILED_EXCHANGE', 'fanout', { durable: false });
        // channel.publish('ORDER_FAILED_EXCHANGE', '', Buffer.from(JSON.stringify(payload)));

        channel.assertQueue(topic, { durable: false });
        channel.sendToQueue(topic, Buffer.from(JSON.stringify(payload)));

        console.log(`[x] Order Service Published an event called: ${topic}`);
    }
}