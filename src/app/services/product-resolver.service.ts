import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {Client} from '../model/client';


@Injectable()
export class ClientResolver implements Resolve<Client> {

  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
    return this.httpService.find<Client>(
      '/clients/id',
      {id: route.params['id']}
      );
  }

}
