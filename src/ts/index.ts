import Control from "./api/control";
import FormCLass from "./form";
import { Products } from "./products";


const control = new Control();
const form = new FormCLass(control);
new Products();

// ViewForm.createBodyContent({
//     id: '1',
//     title: 'CREATE ELEMENT',
//     image: 'IMage',
//     price: 123
// })

// ViewForm.deleteModalBodyViewContent();