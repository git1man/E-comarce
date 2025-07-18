import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { IProduct,IProductResponse } from '../models/models';
import { environment } from '../../environments/environments';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient,private _authS:AuthService) { }
  URL=environment.API_URL

  getProducts(){
    return this._http.get<IProductResponse>(this.URL + '/products')
  }
  getProductById(id: string): Observable<{ message: string, data: IProduct }> {
  return this._http.get<{ message: string, data: IProduct }>(`${this.URL}/products/${id}`);
}
  getRlatedProdcuts(id: string) {
  return this._http.get<IProductResponse>(`${this.URL}/products/related/${id}`);
}
  editProduct(id: string, productData: Partial<IProduct>): Observable<IProductResponse> {
  return this._http.put<IProductResponse>(`${this.URL}/products/${id}`, productData);
}
  addProduct(formData:FormData){
    return this._http.post<any> (this.URL + '/products' ,formData)
  }
  getSortedProducts(sortBy:'price' | 'name' ,order:'asc' | 'desc'){
    return this._http.get<IProductResponse>(
      `${this.URL}/products/sorted?sortBy=${sortBy}&order=${order}`
    )
  }
  searchProducts(keyword:string){
    return this._http.get<IProductResponse>(
      `${this.URL}/products/search/search?keyword=${keyword}`
    )
  }
}
