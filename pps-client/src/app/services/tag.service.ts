import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Tag } from "../classes/tag";
import { Product } from "../classes/product";

@Injectable({
    providedIn: 'root'
})
export class TagService {
    private route : string = "tags";
    
    constructor(
        private httpService: HttpService,
        private tagService: TagService
    ){}

    public getTags(): Promise<Tag[]>{
        return this.httpService.get<Tag[]>(this.route);
    }

    public getProductsByTag(id: number): Promise<Product[]>{
        return this.httpService.get<Product[]>(id + "/products");
    }
}