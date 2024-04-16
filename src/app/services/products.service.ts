import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient)

  list(){
    return this.http.get<Product[]>('http://localhost:8080/list-products');
  }

  get(id: number){
    return this.http.get<Product>(`http://localhost:8080/${id}`)
  }

  create(product: Product){
    return this.http.post<Product>('http://localhost:8080/create-product', product)
  }

  update(id: number, product: Product){
    return this.http.put<Product>(`http://localhost:8080/${id}`, product)
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/${id}`)
  }
}
