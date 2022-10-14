import { IControl } from "./api/control";

export interface IFormInformation {
    name: string;
    password: string;
    email?: string;
}

interface Form {
    getForm: () => void;
}

class CForm implements Form {
    form: HTMLFormElement;
    #type: string;
    #erros: string[];
    #info: IFormInformation;
    
    constructor(private control: IControl) {
        this.form = document.querySelector('form');
        if(!this.form) return
        this.form.addEventListener('submit', this.handlerSubmit);
        this.#type = this.form.getAttribute('id');
        this.#erros = [];
        this.#info = {
            name: '',
            password: '',
            email: ''
        }
    }

    getForm() {
        return this.form;
    }

    private handlerSubmit = (e: Event) => {
        e.preventDefault();
        this.resetErrors();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        for(const pair of formData.entries()) {
            this.validate(pair)
        }
        if(this.checkErros()) return;
        this.setValidForInputs();
        this.setInfo({
            name: formData.get('name') as string,
            password: formData.get('password') as string,
            email: formData.get('email') as string
        });
        this.checkTypeForm();
    }

    private setValidForInputs = () => {
        const inputs = this.form.querySelectorAll('input');
        Array.from(inputs).forEach(input => {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid')
        })
    }

    private setInfo = (info: IFormInformation) => {
        this.#info = info;
    }

    private resetErrors = () => {
        this.#erros = [];
    }

    private setErrorOnPage = (key: string) => {
        const input = this.form.querySelector(`#${key}`);
        input.classList.add('is-invalid')
    }

    private checkTypeForm = () => {
        if(this.#type === 'login') {
            this.control.login(this.#info)
        }
        if(this.#type === 'register') {
            this.control.register(this.#info);
        }
    }

    private checkErros = () => {
        return this.#erros.length > 0;
    }

    private validate([key, value]: [string, FormDataEntryValue]) {
        if(key === 'name') {
            if(!(value.toString().length >= 2 && value.toString().length <= 30)) {
                this.#erros.push('Name has be from 2 to 30 symbols')
                this.setErrorOnPage(key);
            }
        }
        if(key === 'email') {
            if(!(value.toString().length >= 7 && value.toString().length <= 30)) {
                this.#erros.push('Email has be from 7 to 30 symbols')
                this.setErrorOnPage(key);
            }
        } 
        if(key === 'password') {
            if(!(value.toString().length >= 8)) {
                this.#erros.push('Password has be from 8 symbols')
                this.setErrorOnPage(key);
            }
        }
    }
    

}

export default CForm;