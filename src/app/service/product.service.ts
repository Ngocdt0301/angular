import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}`)
  }
  getProduct(id: string): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }
  createProduct(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>(`${this.apiUrl}`, product);
  }
  deleteProduct(id: string | number): Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.apiUrl}/${id}`);
  }
  updateProduct(product: IProduct){
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product)
  }
}
