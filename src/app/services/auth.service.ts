import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponse} from '../model/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>('/auth/generate-token', {username, password});
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'));
  }

}
