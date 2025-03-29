import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import amqplib from "amqplib"
import product_router from "./src/frameworks/express/routes/product-routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors())

app.use("/products", product_router);


(async function () {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  channel.assertQueue('Hello', { durable: false });
  await channel.consume('Hello', (msg) => {
    console.log(`[x] Message Received: ${msg?.content?.toString()}`)
    channel.ack(msg!);
  });
})()

app.listen(PORT, () => {
  console.log(`Product Service Running at: http://localhost:${PORT}/ 🚀`)
});