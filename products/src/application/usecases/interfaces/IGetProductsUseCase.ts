interface ProductObject {
    id: string;
    name: string;
    description: string;
    price: number
}

export interface IGetProductsUseCase {
    execute(): Promise<{ products: ProductObject[] }>;
}