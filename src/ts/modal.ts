import { IProduct } from './api/products'
import { IProductCart } from './cart';
import { IEditProduct } from './products';

interface IModalClass {

}

class Modal implements IModalClass {
    private closeButton: Element;
    protected modal: Element;
    protected modalBody: Element;
    protected content: Element;
    constructor() {
        this.modal = document.querySelector('#modal_open');
        if(!this.modal) return;
        this.modalBody = this.modal.querySelector('.modal-body');
        this.modal.addEventListener('click', this.detectedClickOutsideModal);
    }

    setContent(content: Element) {
        this.content = content;
        this.addElementToBody();
    }

    setTitle(title: string) {
        const titleElement: Element = this.modal.querySelector('.modal-title');
        titleElement.innerHTML = title;
    }

    getModal() {
        return this.modal;
    }

    detectedClickOutsideModal = (e:Event) => {
        if( (e.target as Element).closest('.modal-dialog') ) return;
        this.clearModalBody();
    }

    getContent() {
        return this.content;
    }

    clearModalBody = () => {
        Array.from(this.modalBody.children).forEach(elem => elem.remove());
    }

    addElementToBody() {
        this.modalBody.appendChild(this.content);
    }


}

class ModalBodyView extends Modal {
    constructor() {
        super();
    }

    createBodyContent(info: IProduct) {
        this.setTitle('View Product')
        const { title, price, image } = info
        const content = document.createElement('div');
        content.classList.add('card', 'shadow-sm');
        content.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
            </div>
            <div class="card-body">
                Price: ${price}
            </div>
        `;
        this.setContent(content)
    }
    
   
}

class ModalBodyEdit extends Modal {
    private handlerForEditProduct: (info: IEditProduct) => void;

    constructor() {
        super();
    }

    createBodyContent(info: IProduct) {
        this.setTitle('Edit product');
        const { title, price, image } = info
        const content = document.createElement('form');
        content.innerHTML = `
            <div class="mb-10">
                <label for="title" class="required form-label">Title</label>
                <input id="title" name="title" type="text" class="form-control form-control-solid" placeholder="Title" value=${title} />
            </div>
            <div class="mb-10">
                <label for="image" class="required form-label">Image</label>
                <input id="image"name="img" type="text" class="form-control form-control-solid" placeholder="Image" value=${image} />
            </div>
            <div class="mb-10">
                <label for="price" class="required form-label">Price</label>
                <input id="price" name='price' type="text" class="form-control form-control-solid" placeholder="Price" value=${price} />
            </div>
            <button class='btn btn-primary' type='submit'>Accept</button>
        `;
        this.setContent(content);
        this.setListenersForm();
    }

    setListenersForm() {
        this.content.addEventListener('submit', this.acceptChange);
    }


    setHandlerForEditProduct = (fn: (info: IEditProduct) => void) => {
        this.handlerForEditProduct = fn;
    }

    acceptChange = (e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        this.handlerForEditProduct({
            title: formData.get('title').toString(),
            img: formData.get('img').toString(),
            price: +formData.get('price')
        });
        for(const pair of formData.entries()) {
            console.log(pair)
        }

    }
}

class ModalBodyDelete extends Modal {
    private deleteElementHandler: () => void;
    private deleteElementFromCart: (product: IProduct) => void;
    private product: IProduct;
    constructor() {
        super();
    }

    createBodyContent(product: IProduct) {
        this.product = product;
        this.setTitle('Delete product')
        const content = document.createElement('div');
        content.classList.add('d-flex', 'flex-center', 'gap-5');
        content.innerHTML = `
            <button class="btn btn-danger" data-answer='yes' data-bs-dismiss="modal">Yes</button>
            <button class="btn btn-primary" data-answer='no' data-bs-dismiss="modal">No</button>
        `;
        this.setContent(content)
        this.addListenerToButtons();
    }

    setDeleteElementFromCart(fn: (product: IProduct) => void) {
        this.deleteElementFromCart = fn;
    }

    handlerForDeleteElement(fn: () => void) {
        this.deleteElementHandler = fn;
    }

    private addListenerToButtons() {
        Array.from(this.modal.querySelectorAll('button')).forEach(button => button.addEventListener('click', this.handlerForButton))
    }
    

    private handlerForButton = (e: Event) => {
        const button = e.target as Element;
        const action = button.getAttribute('data-answer');
        action === 'yes' ? this.accept() : this.reject();
    }


    private reject() {
        this.clearModalBody();
    }

    private accept() {
        this.deleteElementHandler();
        this.deleteElementFromCart(this.product);
        this.clearModalBody();
    }
}


class ModalBodyAdd extends Modal {
    private counter: Element;
    private price: number;
    private product: IProduct;

    private addToCartHandler: (product: IProduct) => void;
    private removeFromCartHanlder: (product: IProduct) => void;
    private getValueFromCart: (product: IProduct) => any;
    private getTotalPrice: () => void;

    constructor() {
        super();
    }

    createBodyContent(product: IProduct) {
        this.product = product;
        const content = document.createElement('div');
        content.classList.add('d-flex', 'gap-5', 'flex-column');
        content.innerHTML = `
        <div>
            <span>Title product</span>
            <button class="btn btn-light" data-count="add">+</button>
            <span data-counter>0</span>
            <button class="btn btn-light" data-count="minus">-</button>
            <span>Total price:<span class="price-for-product">price from product</span></span>
        </div>
        <div>
            <button class="btn btn-success">Add</button>
        </div>
        `;
        this.setContent(content);
        this.addCounter();
        this.content.querySelector('.btn-success').addEventListener('click', this.addToCart)
        this.price = 123;//Price from product
    }

    setAddToCartHandler(fn: (product: IProduct) => void) {
        this.addToCartHandler = fn;
    }

    setRemoveFromCartHanlder(fn: (product: IProduct) => void) {
        this.removeFromCartHanlder = fn;
    }

    setHandlerGetPrice(fn: () => void) {
        this.getTotalPrice = fn;
    }

    setGetValueFromCart(fn: (product: IProduct) => void) {
        this.getValueFromCart = fn;       
    }

    addToCart = () => {
        this.getTotalPrice();
    }

    private setCurrentCount(count: number) {
        this.counter.innerHTML = count.toString();
    }

    private setCurrentPrice(price: number) {
        //this set price 
    }

    addCounter() {
        this.counter = this.content.querySelector('[data-counter]');
        const productFromCart: IProductCart = this.getValueFromCart(this.product);
        if(productFromCart) {
            this.setCurrentCount(productFromCart.count);
        }
        const add = this.content.querySelector('[data-count="add"]');
        const minus = this.content.querySelector('[data-count="minus"]');
        add.addEventListener('click', this.setCountAdd);
        minus.addEventListener('click', this.setCountMinus);
    }

    getCurrentCount() {
        return +this.counter.innerHTML;
    }

    setCountMinus = () => {
        const currentCount = this.getCurrentCount();
        const newCount = currentCount - 1;
        if( !(newCount >= 0) ) return;
        this.counter.innerHTML = newCount.toString();
        this.removeFromCartHanlder(this.product)
    }

    setCountAdd = () => {
        const currentCount = this.getCurrentCount();
        const newCount = currentCount + 1;
        if( !(newCount <= 10) ) return;
        this.counter.innerHTML = newCount.toString();
        this.addToCartHandler(this.product);
    }
}
export const ModalBodyV = new ModalBodyView();
export const ModalBodyE = new ModalBodyEdit();
export const ModalBodyD = new ModalBodyDelete();
export const ModalBodyA = new ModalBodyAdd();
