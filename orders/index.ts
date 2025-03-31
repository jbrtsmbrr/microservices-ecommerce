import { StartConsumers } from "./src/adapters/services/events";
import startOrderService from "./src/frameworks/express";

// Start Event-based consumers
StartConsumers();

// Start Application
startOrderService();