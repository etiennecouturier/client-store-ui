import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {ClientsService} from '../services/clients.service';


@Injectable()
export class ClientResolver implements Resolve<Client> {

  constructor(private clientsService: ClientsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
    return this.clientsService.find<Client>(
      {id: route.params['id']}
      );
  }

}
