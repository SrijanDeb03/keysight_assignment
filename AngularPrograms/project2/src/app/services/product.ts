import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; //replaced with backend url

  constructor(private http: HttpClient){  }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct (product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl,product);
  }

  updateProduct(product: Product): Observable<Product>{
    const url= `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url,product);
  }
  

  deleteProduct(id:number) : Observable<any>{
    const url= `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
