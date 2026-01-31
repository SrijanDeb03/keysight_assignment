import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  
  product: any; // single product to be loaded

  constructor(private route: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.product = this.productService.getProductById(id);
  }

}
