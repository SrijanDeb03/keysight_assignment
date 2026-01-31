import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';

@Pipe({
  name: 'productCategory',
  standalone: false,
})
export class ProductCategoryPipe implements PipeTransform {

 transform(products: Product[], category:string): Product[] {
    if(!category || category === 'All'){
      return products;
    }
    return products.filter(product => product.category === category)
  }

}
