import { Product } from '../classes/product';
import { User } from './user';

export class Cart {
    public user: User;
    public products:  { product: Product, pieces: number }[];


}
