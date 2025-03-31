import { MongoClient } from "mongodb"

export class MongoDB {

    private static connection: Promise<MongoClient> | null = null;

    private constructor() { }

    public static instance() {
        if (this.connection === null) {
            const client = new MongoClient(process.env.MONGODB_CONNECTION!);
            this.connection = client.connect();
        }

        return this.connection;
    }
}