import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { IAuth, ILoginResponse, IUser } from '../models/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.API_URL + '/auth'; // pointing to /auth
  private TOKEN_KEY = 'token';
  private myUser = new BehaviorSubject<IUser | null>(null);
  public user$ = this.myUser.asObservable();

  constructor(private _http: HttpClient) {}

  login(credentials: IAuth): Observable<ILoginResponse> {
    return this._http.post<ILoginResponse>(`${this.URL}/login`, credentials).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.myUser.next(this.decode(res.token));
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.myUser.next(null);
  }

  decode(token: string): IUser {
    return jwtDecode<IUser>(token);
  }

  getUsername(): string | null {
    const token = this.getToken();
    return token ? this.decode(token).name : null;
  }

  getRole(): string | null {
    const token = this.getToken();
    return token ? this.decode(token).role : null;
  }
  getUser(): any {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}
}
