import { CreateOrderUseCase } from "../../application/use-cases/create-order.usecase";
import { OrderRepository } from "../persistence/OrderRepository";
import { EventPublisher } from "../services/events/EventPublisher";
import { CreateOrderController } from "./create-order.controller";

// Services
const event_publisher = new EventPublisher();

// Repositories
const order_repository = new OrderRepository();

// Use Cases
const create_order = new CreateOrderUseCase(order_repository, event_publisher);

// Controllers
export const create_order_controller = new CreateOrderController(create_order);