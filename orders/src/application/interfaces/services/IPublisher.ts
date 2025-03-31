import { OrderEventTopic } from "./types";

export interface IPublisher {
    publish(topic: OrderEventTopic, payload: any): Promise<void>;
}