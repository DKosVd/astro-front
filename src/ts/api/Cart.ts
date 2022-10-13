interface Cart {

}

interface BaseApi {
    getCart:(id: string) => Cart;
    addToCart:() => Cart;
    removeFromCart:(idProduct: string) => Cart; 
}