import { IProduct } from './api/products'

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
        this.closeButton = this.modal.querySelector('button[data-bs-dismiss]');
        this.closeButton.addEventListener('click', this.clearModalBody);
        this.modal.addEventListener('click', this.detectedClickOutsideModal);
    }

    setContent(content: Element) {
        this.content = content;
        this.addElementToBody();
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
        const { title, price, image } = info
        const content = document.createElement('div');
        content.classList.add('card', 'shadow-sm');
        const header = document.createElement('div');
        const titleHeader = document.createElement('h3');
        titleHeader.classList.add('card-title');
        titleHeader.innerHTML = title;
        header.classList.add('card-header');
        header.appendChild(titleHeader);
        const body = document.createElement('div');
        body.classList.add('card-body')
        body.innerHTML = price.toString();
        content.appendChild(header);
        content.appendChild(body);
        this.setContent(content)
    }
   
}

class ModalBodyEdit extends Modal {
    constructor() {
        super();
    }

    createBodyContent(info: IProduct) {
        const { title, price, image } = info
        const content = document.createElement('div');
        content.classList.add('card shadow-sm');
        const header = document.createElement('div');
        const titleHeader = document.createElement('h3');
        titleHeader.classList.add('card-title');
        titleHeader.innerHTML = title;
        header.classList.add('card-header');
        header.appendChild(titleHeader);
        const body = document.createElement('card-body');
        body.innerHTML = price.toString();
        content.appendChild(header);
        content.appendChild(body);
        this.content = content;
    }

}

export const ModalBodyV = new ModalBodyView();
export const ModalBodyE = new ModalBodyEdit();
