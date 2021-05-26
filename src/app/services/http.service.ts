import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/page';
import {environment} from '../../environments/environment';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  find<T>(url: String, params: any = {}): Observable<T> {
    return this.http.get<T>(environment.baseUrl + url, { params : params });
  }

  findAll<T>(url: String, params: any = {}): Observable<Array<T>> {
    console.log(url);
    return this.http.get<Array<T>>(environment.baseUrl + url, { params : params });
  }

  findPage<T>(url,
              offset,
              limit,
              searchFilter,
              sortBy: string = 'name',
              sortDirection: string = 'asc'):  Observable<Page<T>> {
    let params = new HttpParams();
    params = params.set('page', offset);
    params = params.set('size', limit);
    params = params.set('name', searchFilter);
    params = params.set('sortBy', sortBy);
    params = params.set('sortDirection', sortDirection);
    return this.http.get<Page<T>>(environment.baseUrl + url, {params : params});
  }

  deleteById(url: String, id: number): Observable<Object> {
    return this.http.delete(environment.baseUrl + url + id);
  }

  saveProduct<T>(url: String, elem: T) {
    return this.http.post<T>(environment.baseUrl + url, elem, {});
  }

}
