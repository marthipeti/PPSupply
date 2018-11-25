import { Product } from "./product";
import { User } from "./user";


export class Reservation {
    public id: number;
    public user: User;
    public products: Product[];
    public quantities: { [productId: number] : number; } = {};
}
