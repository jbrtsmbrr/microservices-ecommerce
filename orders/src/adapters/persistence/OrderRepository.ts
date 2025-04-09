import { Collection, Filter, ObjectId } from "mongodb";
import { IOrderRepository } from "../../application/interfaces/persistence/IOrderRepository";
import { OrderDetails, OrderObject, OrderStatus } from "../../application/use-cases/interfaces/common";
import { MongoDB } from "../../frameworks/mongodb/connection";
import { UpdateOrderParams } from "../../application/use-cases/interfaces/IUpdateOrderUseCase";

interface IOrderProduct {
    product_id: ObjectId;
    quantity: number;
}

interface IOrderCollection {
    _id: ObjectId;
    customer: ObjectId;
    products: IOrderProduct[];
    status: OrderStatus;
    payment_method: any;
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
            payment_method: order.payment_method
        });

        if (!insertedId) return null;

        const new_order = await collection.findOne({ _id: insertedId })

        if (!new_order) return null;

        return {
            id: new_order._id.toString(),
            customer_id: new_order.customer.toString(),
            status: new_order.status,
            products: new_order.products.map(p => ({ product_id: p.product_id.toString(), quantity: p.quantity })),
            payment_method: "Cash On Delivery"
        }
    }

    public async findOne(params: Partial<Omit<OrderObject, "payment_method">>): Promise<OrderObject | null> {
        const connection = await MongoDB.instance();
        const db = connection.db('orders-db');
        const collection: Collection<IOrderCollection> = db.collection('orders-collection');

        const filters = Object.entries(params).reduce<Filter<IOrderCollection>>((accum, current) => {
            const [key, value] = current;

            if (key === 'id')
                // @ts-ignore
                accum['_id'] = new ObjectId(value);
            else
                accum[key] = value;


            return accum
        }, {})

        const order = await collection.findOne(filters);

        if (!order) return null

        return {
            id: order._id.toString(),
            customer_id: order.customer.toString(),
            products: order.products.map(o => ({
                product_id: o.product_id.toString(),
                quantity: o.quantity
            })),
            status: order.status,
            payment_method: "Cash On Delivery"
        }

    }

    public async updateOne(order: UpdateOrderParams): Promise<{ affected_entries: number }> {
        const connection = await MongoDB.instance();
        const db = connection.db('orders-db');
        const collection: Collection<IOrderCollection> = db.collection('orders-collection');

        const updated_order = Object.entries(order).reduce((accum, current) => {
            const [key, value] = current;

            if (key === 'id')
                // @ts-ignore
                accum['_id'] = new ObjectId(value);
            else if (key == 'customer_id')
                // @ts-ignore
                accum['customer'] = new ObjectId(value);
            else if (key == 'products')
                // @ts-ignore
                accum['products'] = value.map(o => ({
                    product_id: new ObjectId(o.product_id as string),
                    quantity: o.quantity
                }))
            else
                accum[key] = value;

            return accum
        }, {} as Record<any, any>)

        const { modifiedCount } = await collection.updateOne({ _id: new ObjectId(order.id) }, { $set: updated_order });

        return { affected_entries: modifiedCount }
    }
}