import amqplib, { Channel } from "amqplib";

export default class RabbitMQ {

  private static channel: Promise<Channel> | null = null;

  private constructor() { }

  public static async createChannel() {
    if (RabbitMQ.channel === null) {
      const connection = await amqplib.connect('amqp://localhost');
      RabbitMQ.channel = connection.createChannel();
    }

    return RabbitMQ.channel;
  }
}