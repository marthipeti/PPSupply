import { Product } from "./product";
import { User } from "./user";

export class Reservation {
    public id: number;
    public user: User;
    public date: Date;
    public products: { product: Product ; pieces: number }[];
}
