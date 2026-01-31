import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productId: any;

  constructor(private route: ActivatedRoute){
    this.productId = this.route.snapshot.paramMap.get('id')
  }

}
