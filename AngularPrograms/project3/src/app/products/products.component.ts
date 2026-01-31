import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  products :any[] = [];

  constructor(private productService: ProductService, private router:Router)
  {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  //The angular router will used to navigate to dynamic detail route
  goToDetails(id:number){
    this.router.navigate(['/products',id]);
  }
}
