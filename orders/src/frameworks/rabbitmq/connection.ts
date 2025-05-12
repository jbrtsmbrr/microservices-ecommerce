import amqplib, { Channel } from "amqplib";

class RabbitMQ {

    private static channel: Promise<Channel> | null = null;

    private constructor() { };

    static async createChannel() {
        if (RabbitMQ.channel === null) {
            const url = process.env.RABBITMQ_URL ?? 'amqp://localhost';
            const connection = await amqplib.connect(url);
            RabbitMQ.channel = connection.createChannel();
        }

        return RabbitMQ.channel;
    }
}

export default RabbitMQ;