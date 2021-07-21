import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post('/users/new', user);
  }

}
