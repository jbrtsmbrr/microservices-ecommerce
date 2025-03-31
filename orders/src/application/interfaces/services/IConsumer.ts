export interface IConsumer {
    startConsuming(): Promise<void>;
}