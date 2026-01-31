import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  products: Product[] = [];
 
  constructor(private productService: ProductService) { }
 
  getProducts() {
    this.products = this.productService.getProducts();
  }
}
 
 