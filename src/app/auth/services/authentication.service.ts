import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) {}

  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
  //TODO emergency change string | null | undefined to any nut it is not correct
  login(mail: any, password: any) {
    const params = new HttpParams()
      .set('username', mail)
      .set('password', password);
    return this.http.post<any>(`${environment.authEndpoint}login`, params);
  }

  register(name: string, username: string, password: string) {
    const user: User = {
      id: null,
      name: name,
      username: username,
      password: password,
      roles: [],
    };
    return this.http.post<User>(`${environment.authEndpoint}user`, user);
  }
  refreshToken() {
    return this.http.get(`${environment.authEndpoint}token/refresh`);
  }
}
