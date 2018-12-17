import { Product } from "./product";
import { User } from "./user";
import { OrderedQuantity } from "./orderedQuantity";

export class Reservation {

    public id: number;
    public user: User;
    public products: Product[];
    public orderedQuantity: OrderedQuantity = {};
}
