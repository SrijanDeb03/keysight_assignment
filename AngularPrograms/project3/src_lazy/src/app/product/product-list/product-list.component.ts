import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products = [
    {id:1, name:'Laptop',price:45000},
    {id:2, name:'LED TV',price:34000}
  ]

  constructor(private router: Router){}

  goToDetail(id:number){
    this.router.navigate(['/product-detail',id])
  }

}
