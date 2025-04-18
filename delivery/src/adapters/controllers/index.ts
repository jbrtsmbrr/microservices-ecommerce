import OngoingDeliveryUseCase from "../../application/use-cases/ongoing-delivery.usecase";
import OrderDeliveredUseCase from "../../application/use-cases/order-delivered.usecase";
import PickupOrdersUseCase from "../../application/use-cases/pickup-orders.usecase";
import PublisherFactory from "../events/PublisherFactory";
import OngoingDeliveryController from "./ongoing-delivery.controller";
import { OrderDeliveredController } from "./order-delivered.controller";
import PickupOrdersController from "./pickup-orders.controller";

// Services
const fanout_publisher = PublisherFactory.createPublisher({ type: 'FANOUT' });

// Use cases
const pickup_usecase = new PickupOrdersUseCase(fanout_publisher);
const ongoing_delivery_usecase = new OngoingDeliveryUseCase(fanout_publisher)
const order_delivered_usecase = new OrderDeliveredUseCase(fanout_publisher);


// Controllers
export const pickup_controller = new PickupOrdersController(pickup_usecase);
export const ongoing_delivery_controller = new OngoingDeliveryController(ongoing_delivery_usecase);
export const order_delivered_controller = new OrderDeliveredController(order_delivered_usecase);