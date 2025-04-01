import { Collection, ObjectId } from "mongodb";
import { IOrderRepository } from "../../application/interfaces/persistence/IOrderRepository";
import { OrderDetails, OrderObject, OrderStatus } from "../../application/use-cases/interfaces/common";
import { MongoDB } from "../../frameworks/mongodb/connection";

interface IOrderProduct {
    product_id: ObjectId;
    quantity: number;
}

interface IOrderCollection {
    _id: ObjectId;
    customer: ObjectId;
    products: IOrderProduct[];
    status: OrderStatus;
}

export class OrderRepository implements IOrderRepository {
    public async save(order: OrderDetails): Promise<OrderObject | null> {
        const connection = await MongoDB.instance();
        const db = connection.db('orders-db');
        const collection: Collection<IOrderCollection> = db.collection('orders-collection');

        const { insertedId } = await collection.insertOne({
            _id: new ObjectId(),
            customer: new ObjectId(),
            status: order.status,
            products: order.products.map(product => ({
                product_id: new ObjectId(product.product_id),
                quantity: product.quantity
            })),
        });

        if (!insertedId) return null;

        const new_order = await collection.findOne({ _id: insertedId })

        if (!new_order) return null;

        return {
            id: new_order._id.toString(),
            customer_id: new_order.customer.toString(),
            status: new_order.status,
            products: new_order.products.map(p => ({ product_id: p.product_id.toString(), quantity: p.quantity })),
        }
    }
}