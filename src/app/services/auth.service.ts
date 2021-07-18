import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponse} from '../model/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {}

  login(username: string, password: string) {
    console.log(username);
    return this.http.post<AuthResponse>(environment.baseUrl + '/auth', {username, password});
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired(localStorage.getItem('id_token'));
  }

}
