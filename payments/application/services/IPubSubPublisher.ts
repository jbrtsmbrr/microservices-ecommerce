import { EventType } from "../event-types";

export default interface IPubSubPublisher {
  publish(type: EventType, payload: any): Promise<void>;
}