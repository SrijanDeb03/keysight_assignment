import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

productId!: any;

constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
     this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

}
