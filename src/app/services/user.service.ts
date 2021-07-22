import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {NotifierService} from 'angular-notifier';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private notifierService: NotifierService) {}

  createUser(user: User) {
    return this.http.post('/users/new', user)
      .pipe(
        tap(
          () => this.notifierService.notify('success', 'sikeres regisztráció')
        ));
  }

}
