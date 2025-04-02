import { Collection, ObjectId } from "mongodb";
import { IProductRepository, } from "../../application/interfaces/persistence/IProductRepository";
import MongoDB from "../../frameworks/mongodb/connection";
import { Conditions } from "../../application/interfaces/persistence/common";
import { ProductDetails, ProductObject } from "../../application/usecases/interfaces/common";

interface IProductCollection {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
}

export class ProductRepository implements IProductRepository {
    public async find(params: Conditions<ProductObject>): Promise<ProductObject | null> {
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

    public async findAll(): Promise<ProductObject[]> {
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

    public async save(product: ProductDetails): Promise<ProductObject | null> {
        const connection = await MongoDB.instance();
        const db = connection.db('products-db');
        const collection: Collection<IProductCollection> = db.collection('products-collection');

        const result = await collection.insertOne({
            _id: new ObjectId(),
            ...product
        });

        if (!result.insertedId) return null;

        const inserted_product = await collection.findOne({
            _id: new ObjectId(result.insertedId)
        });

        if (inserted_product === null) return null;

        return {
            id: inserted_product._id.toString(),
            name: inserted_product.name,
            description: inserted_product.description,
            price: inserted_product.price
        }
    }
}