import amqplib, { ChannelModel } from "amqplib";

class RabbitMQ {

    private static connection: Promise<ChannelModel> | null = null;

    private constructor() { };

    static async getConnection() {
        if (RabbitMQ.connection === null) {
            const url = process.env.RABBITMQ_URL ?? 'amqp://localhost';
            RabbitMQ.connection = amqplib.connect(url);
        }

        return RabbitMQ.connection;
    }
}

export default RabbitMQ;