import { ModalBodyE, ModalBodyV } from "./modal";

interface IProduct {

}

export class Product implements IProduct {
    private product:Element;
    constructor(el) {
        this.product = el;
        this.product.addEventListener('click', this.getTypeForModal)
    }

    getInfoFromProduct() {
        const id = '1';
        const title = 'title';
        const image = 'img';
        const price = 123;
        return {id, title, image, price};
    }

    getTypeForModal = (e:Event) => {
        const product = (e.currentTarget as Element);
        const action = product.getAttribute('data-action');
        action ?
            ModalBodyE.createBodyContent(this.getInfoFromProduct()): 
            ModalBodyV.createBodyContent(this.getInfoFromProduct());
    }

}

export class Products {
    protected products;
    constructor() {
        this.products = document.querySelector('#products');
        if(!this.products) return;
        Array.from(this.products.children).forEach(product => new Product(product))
    }
}

