import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {AuthResponse} from '../model/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(environment.baseUrl + '/auth', {username, password});
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.idToken);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired(localStorage.getItem('id_token'));
  }

}
