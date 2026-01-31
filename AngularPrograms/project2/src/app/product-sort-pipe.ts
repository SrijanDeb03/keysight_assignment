import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';

@Pipe({
  name: 'productSort',
  standalone: false,
})
export class ProductSortPipe implements PipeTransform {

  transform(products: Product[], sortBy: string): Product[] {
    if (!products || !sortBy) {
      return products;
    }

    const sortedProducts = [...products];

    switch (sortBy) {
      case 'priceAsc':
        return sortedProducts.sort((a, b) => a.price - b.price);

      case 'priceDesc':
        return sortedProducts.sort((a, b) => b.price - a.price);

      case 'nameAsc':
        return sortedProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case 'nameDesc':
        return sortedProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      default:
        return products; 
    }
  }
}
