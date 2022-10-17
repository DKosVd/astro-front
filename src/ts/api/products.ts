import {privateAxios} from "./axios";
import axios from "./axios";

export interface IProduct {
    id: string;
    title: string;
    image: string;
    price: number;
}


export interface BaseApi {
    getProducts: (jwt: string) => void;
    getProductById: (id: string) => void;
    createProduct: (info: IProduct) => void;
    editProductById: (id: string) => void;
    deleteProductById: (id: string) => void; 
}


class ProductsApi implements BaseApi {
    constructor() {}
    async getProducts(jwt: string)  {
        try {
            const products = await privateAxios.get('/products', {
                headers: {
                    Authorization: `bearer ${jwt.split('=')[1]}`
                }
            })
            return [] as IProduct[];
        } catch(err) {
            console.log(err.message)
        }
      
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

const Api = new ProductsApi();

export default Api;