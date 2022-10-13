export interface IProduct {
    id: string;
    title: string;
    image: string;
    price: number;
}


interface BaseApi {
    getProducts: () => IProduct[];
    getProductById: (id: string) => IProduct;
    createProduct: (info: IProduct) => IProduct;
    editProductById: (id: string) => IProduct;
    deleteProductById: (id: string) => IProduct; 
}