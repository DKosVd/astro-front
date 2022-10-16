import { ModalBodyA, ModalBodyD, ModalBodyE, ModalBodyV } from "./modal";
import { IProduct } from "./api/products";
import Cart, { ICartClass } from "./cart";
import productApi, {BaseApi} from '../ts/api/products';


export interface IEditProduct {
    title: string;
    img: string;
    price: number;
}

export class Product  {
    private product:Element;
    private handlerForCartAdd: (product: IProduct) => any;
    private handlerForCartDelete: (product: IProduct) => any;
    private handlerGetPrice: () => void;
    private handlerDeleteProduct: (product: IProduct) => void;
    private handlerGetInfoProductFromCart: (product: IProduct) => void;

    constructor(el: Element, private cart: ICartClass, private productApi:BaseApi) {
        this.product = el;
        this.product.addEventListener('click', this.getTypeForModal);
        this.setHadlerForCartAdd(this.cart.addToCart);
        this.setHadlerForCartDelete(this.cart.deleteFromCartOneOfProduct)
        this.setHandlerGetPrice(this.cart.getTotalPrice);
        this.setHandlerDeleteProduct(this.cart.deleteFromCartAllOfProduct);
        this.setHandlerGetInfoProductFromCart(this.cart.getInfoByProduct);
    }

    getInfoFromProduct():IProduct {
        const id = this.product.getAttribute('id');
        const title = this.product.querySelector('.card-title').innerHTML;
        const image = 'img';
        const price = +this.product.querySelector('.card-body .card-p').innerHTML.split(':')[1];
        return {id, title, image, price};
    }

    setHadlerForCartAdd(fn: (product: IProduct) => void) {
        this.handlerForCartAdd = fn;
    }

    setHadlerForCartDelete(fn: (product: IProduct) => void) {
        this.handlerForCartDelete = fn;
    }

    setHandlerGetPrice(fn: () => void) {
        this.handlerGetPrice = fn;
    }

    setHandlerDeleteProduct(fn: (product: IProduct) => void) {
        this.handlerDeleteProduct = fn;
    }

    setHandlerGetInfoProductFromCart(fn: (product: IProduct) => void) {
        this.handlerGetInfoProductFromCart = fn;
    }

    setInfoProduct(info: IProduct) {
        
    }

    getTypeForModal = (e:Event) => {
        const product = (e.target as Element);
        const action = product.getAttribute('data-action');
        switch(action) {
            case 'add':
                ModalBodyA.setGetValueFromCart(this.handlerGetInfoProductFromCart)
                ModalBodyA.createBodyContent(this.getInfoFromProduct());
                ModalBodyA.setAddToCartHandler(this.handlerForCartAdd);
                ModalBodyA.setRemoveFromCartHanlder(this.handlerForCartDelete);
                ModalBodyA.setHandlerGetPrice(this.handlerGetPrice)
                break;
            case 'edit':
                ModalBodyE.createBodyContent(this.getInfoFromProduct());
                ModalBodyE.setHandlerForEditProduct(this.editElement);
                break;
            case 'delete':
                ModalBodyD.createBodyContent(this.getInfoFromProduct());
                ModalBodyD.handlerForDeleteElement(this.deleteElement);
                ModalBodyD.setDeleteElementFromCart(this.handlerDeleteProduct);
                break
            default:
                ModalBodyV.createBodyContent(this.getInfoFromProduct());
                break;
        }         
    }

    editElement = (info: IEditProduct) => {
        console.log(info)
    }

    deleteElement = () => {
        this.productApi.deleteProductById(this.getInfoFromProduct().id);
        this.product.remove();
    }

}

export class Products {
    protected products: Element;
    constructor() {
        this.products = document.querySelector('#products');
        if(!this.products) return;
        Array.from(this.products.children).forEach(product => new Product(product, Cart.getCart(), productApi))
    }
}

