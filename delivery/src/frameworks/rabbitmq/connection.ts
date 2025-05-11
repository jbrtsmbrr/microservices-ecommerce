import amqplib, { Channel } from "amqplib";

export default class RabbitMQ {
    private static channel: Promise<Channel> | null = null;

    private constructor() { }

    public static async getChannel() {
        if (RabbitMQ.channel === null) {
            const url = process.env.RABBITMQ_URL ?? 'amqp://localhost';
            const connection = await amqplib.connect(url);
            RabbitMQ.channel = connection.createChannel();
        }

        return RabbitMQ.channel;
    }
}