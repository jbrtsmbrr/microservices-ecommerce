
import DirectPublisher from "./DirectPublisher";
import FanoutPublisher from "./FanoutPublisher";


export interface IPublisherOptions {
    type: "DIRECT" | "FANOUT";
    // topic: string;
}

export interface IPublisher {
    publish(topic: string, payload: any): Promise<void>;
}


export default class PublisherFactory {

    public static createPublisher(options: IPublisherOptions): IPublisher {
        if (options.type === "FANOUT")
            return new FanoutPublisher()

        return new DirectPublisher();
    }
}