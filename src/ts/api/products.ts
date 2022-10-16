export interface IProduct {
    id: string;
    title: string;
    image: string;
    price: number;
}


export interface BaseApi {
    getProducts: () => void;
    getProductById: (id: string) => void;
    createProduct: (info: IProduct) => void;
    editProductById: (id: string) => void;
    deleteProductById: (id: string) => void; 
}


class ProductsApi implements BaseApi {
    constructor() {}
    getProducts = async () => {
        console.log('getProducts')
        return [] as IProduct[];
    };
    
    getProductById = async (id: string) => {
        console.log('getProductsById')
    };

    createProduct = async (info: IProduct) => {
        console.log('createProduct')
    };

    deleteProductById = async (id: string) => {
        console.log('deleteProductById')
    };

    editProductById = async (id: string) => {
        console.log('editProductById')
    };
}

export default new ProductsApi();