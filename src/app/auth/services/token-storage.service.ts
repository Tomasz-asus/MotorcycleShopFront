import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private ACCESS_TOKEN = 'access_token';
  private REFRESH_TOKEN = 'refresh_token';

  constructor(private jwtHelper: JwtHelperService) {
  }
  saveTokens(accessTok: string, refreshTok: string) {
    if (!accessTok || !refreshTok) {
      return
    }
    window.localStorage.removeItem(this.ACCESS_TOKEN);
    window.localStorage.removeItem(this.REFRESH_TOKEN);
    window.localStorage.setItem(this.ACCESS_TOKEN, accessTok);
    window.localStorage.setItem(this.REFRESH_TOKEN, refreshTok);
  }
  isLoggedIn(): boolean {
    return this.tokenIsPresent() && !this.jwtHelper.isTokenExpired(this.getAccessToken());
  }
  tokenIsPresent(): boolean {
    return !!window.localStorage.getItem(this.ACCESS_TOKEN);
  }
  getAccessToken(): any {
    return window.localStorage.getItem(this.ACCESS_TOKEN);
  }
  getDecodedAccessToken(token: any): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (Error) {
      return null;
    }
  }
  getBasketName(): string {
    let token = this.getAccessToken();
    let tokenInfo = this.getDecodedAccessToken(token);
    return tokenInfo.basketName;
  }
  getNameFromToken(): string {
    let token = this.getAccessToken();
    let tokenInfo = this.getDecodedAccessToken(token);
    return tokenInfo.name;
  }
  getUserNameFromToken(): string {
    let token = this.getAccessToken();
    let tokenInfo = this.getDecodedAccessToken(token);
    return tokenInfo.sub;
  }
  getRefreshToken() {
    return window.localStorage.getItem(this.REFRESH_TOKEN);
  }
  clearTokens() {
    window.localStorage.removeItem(this.ACCESS_TOKEN);
    window.localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
