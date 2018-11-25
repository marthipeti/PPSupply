export class Cart {
    public productIds: number[];
    public quantities: { [productId: number] : number; } = {};
}
