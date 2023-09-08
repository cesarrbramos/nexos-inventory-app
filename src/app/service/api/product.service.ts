import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { Page } from "src/app/utils/page";
import { Product } from "src/app/models/product.model";

@Injectable({providedIn: 'root'})
export class ProductService {

    constructor(private api: ApiService) { }

    getProducts(query: string, pageIndex: number, pageSize: number): Observable<Page<Product>> {
        return this.api.get(`${ApiService.URL}/products?name=${query}&&page=${pageIndex}&size=${pageSize}`);
    }

    create(product: Product, userId: number): Observable<Product> {
        return this.api.post(`${ApiService.URL}/products?userId=${userId}`, product);
    }

    update(productId: number, product: Product, userId: number): Observable<Product> {
        return this.api.put(`${ApiService.URL}/products/${productId}?userId=${userId}`, product);
    }

    delete(productId: number, userId: number): Observable<Product> {
        return this.api.delete(`${ApiService.URL}/products/${productId}?userId=${userId}`);
    }

}