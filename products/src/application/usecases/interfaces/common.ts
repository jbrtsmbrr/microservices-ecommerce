export interface ProductDetails {
    name: string;
    description: string;
    price: number;
}

export interface ProductObject extends ProductDetails {
    id: string;
}