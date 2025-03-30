import { Collection, ObjectId } from "mongodb";
import { Conditions, IProductRepository, Product } from "../../application/interfaces/persistence/IProductRepository";
import MongoDB from "../../frameworks/mongodb/connection";

interface IProductCollection {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
}

export class ProductRepository implements IProductRepository {
    public async find(params: Conditions<Product>): Promise<Product | null> {
        const connection = await MongoDB.instance();
        const db = connection.db('products-db');
        const collection: Collection<IProductCollection> = db.collection('products-collection');

        const product = await collection.findOne(params);

        if (product === null) return null;

        return {
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price
        }
    }

    public async findAll(): Promise<Product[]> {
        try {
            const connection = await MongoDB.instance();
            const db = connection.db('products-db');
            const collection: Collection<IProductCollection> = db.collection('products-collection');

            const products = await collection.find({}).toArray();

            return products.map((product) => ({
                id: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price
            }))
        } catch {
            console.log("error")
            return []
        }
    }
}