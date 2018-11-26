import { Product } from "./product";
import { User } from "./user";
type Dictionary = { product: Product ; pieces: number };


export class Reservation {
    public id: number;
    public user: User;
    public date: Date;
    public products: Array<Dictionary>;
}
