import { Injectable } from '@angular/core';
import { Product } from './product';
 
@Injectable({
    providedIn: 'root'
})
export class ProductService {
 
    constructor() { }
 
    getProducts(): Product[] {
        return [
            new Product(1, 'Memory Card', 500),
            new Product(2, 'Pen Drive', 750),
            new Product(3, 'Power Bank', 100)
        ];
    }
}
 
 