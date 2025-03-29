export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

export type Conditions<T> = Partial<T>

export interface IProductRepository {
    findAll(): Promise<Product[]>;
    find(params: Conditions<Product>): Promise<Product | null>;
}