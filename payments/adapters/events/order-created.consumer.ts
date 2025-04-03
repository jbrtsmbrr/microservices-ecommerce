import RabbitMQ from "../../frameworks/rabbitmq/connection";
import ProcessPaymentUseCase from "../../application/use-cases/process-payment.usecase";
import { PubsubPublisher } from "./pubsub.publisher";
import { OrderDetails } from "../../application/use-cases/interfaces/IProcessPaymentUseCase";

const pubsub_publisher = new PubsubPublisher();
const process_payment = new ProcessPaymentUseCase(pubsub_publisher);

// Order Created
(async function () {
  const channel = await RabbitMQ.createChannel();

  channel.assertQueue('ORDER_CREATED', { durable: false });

  channel.consume('ORDER_CREATED', async (msg) => {
    if (msg !== null) {
      // @ts-ignore
      const data: OrderDetails = JSON.parse(msg.content);
      console.log(`[x] Payment Service received order: ${data.id}`);
      await process_payment.execute(data);
      channel.ack(msg)
    }
  })
})();