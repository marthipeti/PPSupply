import { Product } from "./product";
import { User } from "./user";
import { OrderedQuantity } from "./orderedQuantity";

export class Reservation {

    public id: number;
    public user: User;
    public products: Product[];
    public orderedQuantity: OrderedQuantity = {};
    //public orderedQuantity: {productId: number, quantity: number}[];
    //public orderedQuantity: IHash = {};

   /* constructor(user: User, products: { product: Product ; pieces: number }[]){
        this.user = user;
        this.products = products;
    }*/
}
