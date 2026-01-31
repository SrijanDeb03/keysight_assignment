import { Component, signal } from '@angular/core';
import { ProductService } from './services/product';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  selectedCategory = 'All';
  sortOption=' '

  products: Product[] = []; //array to store the products from service class

  protected readonly title = signal('project2');
  constructor(private productService: ProductService){} //injecting service into the component

  getAllProducts(){
    this.productService.getProducts().subscribe(data =>{
      console.log('GET',data);
      this.products =data; //storing the data coming from service into the declared array
    })
  }

  addProduct (){
    const newProduct:Product = { //this new prodcut will be added to the server
      id:0,
      name: 'Smart Watch',
      description: 'Wearable device',
      price: 250,
      category:'electronics'
    }

    this.productService.addProduct(newProduct).subscribe(data=>{
      console.log('POST',data);
      this.getAllProducts();
    })
  }

  updateProduct(){
    const updateProduct:Product ={
      id:1,
      name:'Smart Watch X series',
      description: 'Latest AI tech',
      price: 950,
      category:'electronics'
    }

    this.productService.updateProduct(updateProduct).subscribe(data =>{
      console.log('PUT', data);
      this.getAllProducts();
    })

  }

  deleteProduct(){
  this.productService.deleteProduct(3).subscribe(()=>{
    console.log('DELETE: Successful');
    this.getAllProducts();
  })
}

}
