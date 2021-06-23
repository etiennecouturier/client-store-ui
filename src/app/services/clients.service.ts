import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {Page} from '../model/page';
import {environment} from '../../environments/environment';
import {CountPerDate} from '../model/count-per-date';
import {CountPerAge} from '../model/count-per-age';

@Injectable()
export class ClientsService {

  constructor(private http: HttpClient) {}

  findClients(name, sortBy, sortDirection, offset, limit): Observable<Page<Client>> {
    let params = new HttpParams();
    params = params.set('name', name);
    params = params.set('sortBy', sortBy);
    params = params.set('sortDirection', sortDirection);
    params = params.set('page', offset);
    params = params.set('size', limit);
    return this.http.get<Page<Client>>(environment.baseUrl + '/clients/filter/', {params: params});
  }

  findVisitCountForLast10Days(): Observable<CountPerDate[]> {
    return this.http.get<CountPerDate[]>(environment.baseUrl + '/clients/visit-count-last-10-days');
  }

  findVisitorCountPerAge(): Observable<CountPerAge[]> {
    return this.http.get<CountPerAge[]>(environment.baseUrl + '/clients/visitor-count-age');
  }

}
