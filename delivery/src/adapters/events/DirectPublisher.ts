import RabbitMQ from "../../frameworks/rabbitmq/connection";
import { IPublisher } from "./PublisherFactory";

export default class DirectPublisher implements IPublisher {

  // constructor(private readonly _queue: string) {}

  public async publish(queue: string, payload: any): Promise<void> {
    const channel = await RabbitMQ.getChannel();
    channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(payload));
  }
}
