import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';
import { ICart } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   constructor(private _http: HttpClient, private _austhS: AuthService) { }

  URL = environment.API_URL;

  private get userId(): string | null {
    return this._austhS.getUser()?._id || null;
  }

 getCart(): Observable<{ cart: ICart }> {
  return this._http.get<{ cart: ICart }>(`${this.URL}/cart`);
}

addToCart(productId: string, quantity: number = 1): Observable<{ message: string, cart: ICart }> {
  return this._http.post<{ message: string, cart: ICart }>(
    `${this.URL}/cart/add`,
    { productId, quantity }
  );
}

updateCart(productId: string, quantity: number): Observable<{ message: string, cart: ICart }> {
  return this._http.put<{ message: string, cart: ICart }>(
    `${this.URL}/cart/update`,
    { productId, quantity }
  );
}

deleteFromCart(productId: string): Observable<{ message: string, cart: ICart }> {
  return this._http.request<{ message: string, cart: ICart }>(
    'delete',
    `${this.URL}/cart/remove`,
    { body: { productId } }
  );
}
}