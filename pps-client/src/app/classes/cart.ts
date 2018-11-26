import { Product } from '../classes/product';
type Dictionary = { product: Product ; pieces: number };

export class Cart {
    public products:  Array<Dictionary> = new Array<Dictionary>();

    public addToCart(product: Product, pieces: number): void {
        this.products.push({product: product, pieces: pieces});
        console.log(this.products);
    }

    public removeFromCart(product: Product): void {
        let index = this.products.findIndex(x => x.product === product );
        if (index !== -1) {
            this.products.splice(index, 1);
        }   
    }

    public getProducts(): Array<Dictionary> {
        return this.products;
    }

}


