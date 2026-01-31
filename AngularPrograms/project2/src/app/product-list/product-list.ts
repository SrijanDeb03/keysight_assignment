import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
 
  productsNew = [
    {
      id:1,
      name:'Laptop',
      description: 'Laptop leovno',
      price: 34000,
      category:'Electronics'
    },
    {
      id:2,
      name:'SmartPhone',
      description: 'megapixel smartphone',
      price: 8000,
      category:'Electronics'
    },
    {
      id:3,
      name:'LED TV hd',
      description: 'Samsung LED TV',
      price: 10000,
      category:'Electronics'
    }
  ]
 
  selectedProduct = this.productsNew[0];  //default product
 
  selectProduct(product: any){
    this.selectedProduct = product
  }

  //implememting cart feature below to recive the value from Child
 
  cart : any[] = [];
  handleAddToCart(product: any){ // product is coming from Child
    this.cart.push(product);
    alert(`${product.name} added to Cart !!`);
  }
 
}