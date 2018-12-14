import { Product } from "./product";
import { User } from "./user";

export class Reservation {
    public id: number;
    public user: User;
    public products: { product: Product ; pieces: number }[];

   /* constructor(user: User, products: { product: Product ; pieces: number }[]){
        this.user = user;
        this.products = products;
    }*/
}
