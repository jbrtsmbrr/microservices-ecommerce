// type IPublisherOptions = DirectOptions | FanoutOptions

import RabbitMQ from "./src/frameworks/rabbitmq/connection";

// interface DirectOptions {
//     type: "DIRECT";
//     queue: string;
// }

// interface FanoutOptions {
//     type: "FANOUT";
//     exchange: string;
// }

interface IPublisherOptions {
    type: "DIRECT" | "FANOUT";
    topic: string;
}

interface IPublisher {
    publish(payload: any): Promise<void>;
}

class FanoutPublisher implements IPublisher {

    constructor(private readonly _exchange: string) { }

    public async publish(payload: any): Promise<void> {
        const channel = await RabbitMQ.createChannel();
        channel.assertExchange(this._exchange, 'fanout');

        channel.publish(this._exchange, '', Buffer.from(JSON.stringify(payload)))
        return Promise.resolve();
    }
}

class DirectPublisher implements IPublisher {

    constructor(queue: string) {

    }

    publish(payload: any): Promise<void> {
        return Promise.resolve();
    }
}


class PublisherFactory {

    public static createPublisher(options: IPublisherOptions): IPublisher {
        if (options.type === "FANOUT")
            return new FanoutPublisher(options.topic)

        return new DirectPublisher(options.topic);
    }
}


const publisher = PublisherFactory.createPublisher({ type: "DIRECT", topic: "" })
publisher.publish({})