import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import RabbitMQ from "../rabbitmq/RabbitMQ";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", proxy(process.env.PRODUCTS_API_URL!));
app.use("/orders", proxy(process.env.ORDERS_API_URL!));
app.use("/delivery", proxy(process.env.DELIVERY_API_URL!));

app.use('/queue-message', async (_, res) => {
    let connection = await RabbitMQ.getConnection();
    try {
        const channel = await connection.createChannel();
        channel.assertQueue('Hello', { durable: false });
        channel.sendToQueue('Hello', Buffer.from('Hello World!'));

        console.log('[x] Hello World Sent!');

    } catch {
        console.log('[x] Error while sending Hello World.');
    }

    res.send();
})

function init(PORT: number | string) {
    app.listen(PORT, () => console.log(`Main Service Running at: http://localhost:${PORT}/ 🚀`));
}

export default init;