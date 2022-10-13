import { IFormInformation } from "../form";

interface BaseApi  {
    register: (info: IFormInformation) => void;
    login: (info: IFormInformation) => void;
}


class Control implements BaseApi {
    constructor() {}

    register(info: IFormInformation) {
        console.log(info)
    }

    login(info: IFormInformation) {
        console.log(info)
    }
}

export default Control;