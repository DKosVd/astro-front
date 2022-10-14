import { ModalBodyA, ModalBodyD, ModalBodyE, ModalBodyV } from "./modal";

interface IProduct {

}

export class Product implements IProduct {
    private product:Element;
    constructor(el: Element) {
        this.product = el;
        this.product.addEventListener('click', this.getTypeForModal);
    }

    getInfoFromProduct() {
        const id = this.product.getAttribute('id');
        const title = this.product.querySelector('.card-title').innerHTML;
        const image = 'img';
        const price = +this.product.querySelector('.card-body .card-p').innerHTML.split(':')[1];
        return {id, title, image, price};
    }

    setInfoProduct(info: IProduct) {
        
    }

    getTypeForModal = (e:Event) => {
        const product = (e.target as Element);
        const action = product.getAttribute('data-action');
        switch(action) {
            case 'add':
                ModalBodyA.createBodyContent();
                break;
            case 'edit':
                ModalBodyE.createBodyContent(this.getInfoFromProduct());
                break;
            case 'delete':
                ModalBodyD.createBodyContent();
                ModalBodyD.handlerForDeleteElement(this.deleteElement());
                break
            default:
                ModalBodyV.createBodyContent(this.getInfoFromProduct());
                break;
        }         
    }

    deleteElement() {
        const product = this.product;
        return () => {
            product.remove();
        }
    }

}

export class Products {
    protected products: Element;
    constructor() {
        this.products = document.querySelector('#products');
        if(!this.products) return;
        Array.from(this.products.children).forEach(product => new Product(product))
    }
}

