import amqplib, { ChannelModel } from "amqplib";

class RabbitMQ {

    private static connection: Promise<ChannelModel> | null = null;

    private constructor() { };

    static async getConnection() {
        if (RabbitMQ.connection === null) {
            RabbitMQ.connection = amqplib.connect('amqp://localhost');
        }

        return RabbitMQ.connection;
    }
}

export default RabbitMQ;