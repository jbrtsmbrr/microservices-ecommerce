import { MongoClient, ServerApiVersion } from "mongodb"

class MongoDB {

    private static connection: Promise<MongoClient> | null = null

    private constuctor() { }

    public static instance() {
        if (MongoDB.connection === null) {
            const client = new MongoClient(process.env.MONGODB_CONNECTION!, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            MongoDB.connection = client.connect();
        }

        return MongoDB.connection;
    }
}

export default MongoDB