import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = [
    {id:1, name:'Laptop', 'price': 40000},
    {id:2, name:'SmartPhone', 'price': 3000},
    {id:3, name:'Headphone', 'price': 1000},
  ];

  getProducts(){
   return this.products;
  }

  getProductById(id:number){
    return this.products.find(p => p.id === id)
  }

  constructor() { }
}
