import RabbitMQ from "../../frameworks/rabbitmq/connection";
import { IPublisher } from "./PublisherFactory";

export default class FanoutPublisher implements IPublisher {

  // constructor(private readonly _exchange: string) { }

  public async publish(topic: string, payload: any): Promise<void> {
      const channel = await RabbitMQ.getChannel();
      channel.assertExchange(topic, 'fanout');
      console.log(`Publishing ${topic}`);
      channel.publish(topic, '', Buffer.from(JSON.stringify(payload)));
  }
}