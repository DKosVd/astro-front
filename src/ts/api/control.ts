import { AxiosResponse } from "axios";
import { IFormInformation } from "../form";
import { setCookie } from "../utils/Cookie";
import axios from "./axios";

interface BaseApi  {
    register: (info: IFormInformation) => void;
    login: (info: IFormInformation) => void;
}

interface User {
    id: number;
    username: string;
    email: string;

}

interface dataUser {
    jwt: string;
    user: User;
}

interface Response {
    data: dataUser;
}

class Control implements BaseApi {
    constructor() {}

    async register(info: IFormInformation) {
        try {
            const { data }: Response = await axios.post('/auth/local/register', {
                username: info.name,
                email: info.email,
                password: info.password
            })
            if(data) {
                document.location.replace(`http://${document.location.host}/login`)
            }
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }

    async login(info: IFormInformation) {
        try {
            const { data }: Response = await axios.post('/auth/local', {
                identifier: info.name,
                password: info.password
            })
            if(data) {
                setCookie('jwt', data.jwt);
                document.location.replace(`http://${document.location.host}/products`);
                return;
            }
        } catch(err) {
            console.log(err)
        }
       
    }
}

export default Control;