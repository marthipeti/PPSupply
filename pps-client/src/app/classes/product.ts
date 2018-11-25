import { Tag } from "./tag";

export class Product {
    public id: number;
    public name: string;
    public quantity: number;
    public description: string;
    public tags: Tag[];
}
