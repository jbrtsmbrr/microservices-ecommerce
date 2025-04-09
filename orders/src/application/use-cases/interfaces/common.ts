export type OrderStatus =
    // Default status when order is created
    "PENDING" |
    // Status when payment is successful
    "PREPARING" |
    // When use request for cancellation
    "CANCEL_REQUESTED" |
    // When shop approved cancellation
    "CANCELLED" |
    // When order is on it's way to user
    "ON_GOING_DELIVERY" |
    // When? payment issue, inventory issue
    "FAILED" |
    // Successful
    "COMPLETED"

export interface OrderedProduct {
    product_id: string;
    quantity: number
}

export interface Card {
    type: "DEBIT" | "CREDIT" | "SAVINGS";
    account: string;
}

export type CashOnDelivery = "Cash On Delivery"

export type PaymentMethod = Card | CashOnDelivery;

export interface OrderDetails {
    products: OrderedProduct[];
    status: OrderStatus;
    customer_id: string;
    payment_method: PaymentMethod;
}

export interface OrderObject extends OrderDetails {
    id: string;
}