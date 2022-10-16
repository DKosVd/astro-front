import { IProduct } from "./api/products";
import  cartApi, {BaseApi}  from "./api/Cart";

export interface IProductCart {
    count: number;
    product: IProduct;
    totalPrice?: number;
}

interface ICart {
    products: IProductCart[];
}

export interface ICartClass {
    addToCart: (product: IProduct) => void;
    deleteFromCartOneOfProduct: (product: IProduct) => void;
    deleteFromCartAllOfProduct: (product: IProduct) => void;
    getInfoByProduct: (product: IProduct) => void;

    clearCart: () => void;
    getTotalPrice: () => void;
}


class Cart implements ICartClass{
    private products: Map<string, IProductCart>;
    static CartInstance: Cart;
    private totalPrice: number;
    private counterEl: Element;

    constructor(private cartApi: BaseApi) {
        this.counterEl = document.querySelector('.counter-cart');
        this.products = new Map();
        this.totalPrice = 0;
    }

    static getCart() {
        if(!Cart.CartInstance) {
            Cart.CartInstance = new Cart(cartApi);
        }
        return Cart.CartInstance;
    }

    //Rebuild total price
    addToCart = (product: IProduct) => {
        const id = product.id;   
        const productOld = this.products.get(id);
        if(!productOld) {
            this.products.set(id, {
                count: 1,
                product,
                totalPrice: product.price
            })
            this.totalPrice += product.price;
            //api
            this.cartApi.addToCart();
            this.updateCounterEl();
            return;
        }
        const price = product.price * (productOld.count + 1)
        this.products.set(id, {
            count: this.products.get(id).count + 1,
            product,
            totalPrice: price
        })
        this.totalPrice += price;
        //api
        this.cartApi.addToCart();
        this.updateCounterEl();
    }
    //Rebuild total price
    deleteFromCartOneOfProduct = (product: IProduct) => {
        const id = product.id;   
        const productOld = this.products.get(id);
        const count = this.products.get(id).count - 1;
        if(!count) {
            this.deleteFromCartAllOfProduct(product);
            return
        }
        if(productOld) {
            const price = productOld.count * product.price;
            this.products.set(id, {
                count,
                product,
                totalPrice: price 
            })
            this.totalPrice -= price
        }    
        this.updateCounterEl();
    }
    //Rebuild total price
    deleteFromCartAllOfProduct = (product: IProduct) => {
        console.log('here')
        const id = product.id;   
        const productOld = this.products.get(id);
        if(productOld) {
            const price = productOld.totalPrice;
            this.products.delete(id)
            this.totalPrice -= price; 
        }
        //api
        this.cartApi.removeFromCart(id);
        this.updateCounterEl();
    }
    //Rebuild total price
    getTotalPrice = () => {
        return this.totalPrice;
    }

    getInfoByProduct = (product: IProduct) => {
        console.log('here')
        const pr = this.products.get(product.id);
        if(!pr) return;
        return pr; 
    }

    updateCounterEl() {
        this.counterEl.innerHTML = this.getSizeCart().toString();
    }

    getSizeCart = () => {
        return this.products.size;
    }

    clearCart() {
        this.products.clear();
    }

}

export default Cart;