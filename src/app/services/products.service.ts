import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient)

  list(){
    return this.http.get<Product[]>('http://frgaria-api-production.up.railway.app/list-products');
  }

  get(id: number){
    return this.http.get<Product>(`http://frgaria-api-production.up.railway.app/${id}`)
  }

  create(product: Product){
    return this.http.post<Product>('http://frgaria-api-production.up.railway.app/create-product', product)
  }

  update(id: number, product: Product){
    return this.http.put<Product>(`http://frgaria-api-production.up.railway.app/${id}`, product)
  }

  delete(id: number){
    return this.http.delete(`http://frgaria-api-production.up.railway.app/${id}`)
  }
}
