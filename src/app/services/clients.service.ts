import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {Page} from '../model/page';

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
    return this.http.get<Page<Client>>('/clients/filter/', {params: params});
  }

  find<T>(params: any = {}): Observable<T> {
    return this.http.get<T>('/clients/id', { params : params });
  }

  deleteById(id: number): Observable<Object> {
    return this.http.delete(`/clients/${id}`);
  }

  save<T>(elem: T) {
    return this.http.post<T>('/clients/new', elem, {});
  }

}
