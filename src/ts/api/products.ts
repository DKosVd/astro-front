import {privateAxios} from "./axios";
import axios from "./axios";
import { IEditProduct } from "../products";

export interface IProduct {
    P_ID: string;
    Title: string;
    Image: string;
    Price: number;
}


export interface BaseApi {
    getProducts: (jwt: string) => void;
    getProductById: (id: string) => void;
    createProduct: (info: IProduct) => void;
    editProductById: (id: string, info: IEditProduct) => void;
    deleteProductById: (id: string) => void; 
}

interface ResponseData {
    id: number;
    attributes: IProduct;
}

interface Response {
    data: ResponseData[];
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
            if(products.data) {
                return products.data as Response;
            }
            return 
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
        try {
            const data = await privateAxios.delete(`/products/${id}`);
        } catch(err) {
            console.log(err)
        }
    };

    editProductById = async (id: string, info: IEditProduct) => {
        try {
            console.log(info)
            const data = await privateAxios.put(`/products/${id}`, {
                info
            })
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    };
}

const Api = new ProductsApi();

export default Api;