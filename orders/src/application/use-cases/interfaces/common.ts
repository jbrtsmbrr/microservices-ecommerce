export type OrderStatus = "PENDING" | "FAILED" | "COMPLETED"

export interface OrderedProduct {
    product_id: string;
    quantity: number
}

export interface OrderDetails {
    products: OrderedProduct[];
    status: OrderStatus;
    customer_id: string;
}

export interface OrderObject extends OrderDetails {
    id: string;
}