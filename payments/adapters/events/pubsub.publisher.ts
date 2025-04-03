import IPubSubPublisher from "../../application/services/IPubSubPublisher";
import RabbitMQ from "../../frameworks/rabbitmq/connection";

export class PubsubPublisher implements IPubSubPublisher {
  async publish(topic: string, payload: any): Promise<void> {

    const channel = await RabbitMQ.createChannel();

    channel.assertExchange('PAYMENT_SUCCESS_EXCHANGE', 'fanout');

    channel.publish('PAYMENT_SUCCESS_EXCHANGE', '', Buffer.from(JSON.stringify(payload)));
  }
}