import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPurchase } from '../models/models'; // adjust path as needed
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  // For regular user
  getUserPurchases(): Observable<{ message: string; data: IPurchase[] }> {
    return this.http.get<{ message: string; data: IPurchase[] }>(`${this.URL}/allpurchase`);
  }

  // For admin
  getAllUserPurchases(params?: {
    userId?: string,
    productId?: string,
    startDate?: string,
    endDate?: string,
    page?: number,
    limit?: number
  }): Observable<{ message: string; data: IPurchase[] }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<{ message: string; data: IPurchase[] }>(`${this.URL}/purchase/allpurchase`, { params: httpParams });
  }
}
