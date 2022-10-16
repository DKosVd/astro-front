interface ICart {

}

export interface BaseApi {
    getCart:(id: string) => ICart;
    addToCart:() => ICart;
    removeFromCart:(idProduct: string) => ICart; 
    clearCart: () => void;
}

class CartApi implements BaseApi {
    constructor() {}

    getCart =  async (id: string) => {
        console.log('GET CART')
    }

    addToCart =  async () => {
        console.log('add to cart')
    }

    removeFromCart =  async (idProduct: string) => {
        console.log('removeFromCart')
    }

    clearCart =  async () => {
        console.log('clear cart')
    }

}

export default new CartApi();