import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  find<T>(url: String, params: any = {}): Observable<T> {
    return this.http.get<T>(environment.baseUrl + url, { params : params });
  }

  deleteById(url: String, id: number): Observable<Object> {
    return this.http.delete(environment.baseUrl + url + id);
  }

  save<T>(url: String, elem: T) {
    return this.http.post<T>(environment.baseUrl + url, elem, {});
  }

  download(): Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/pdf/download/60e0da6394d37002c7386abf`, {
      responseType: 'blob'
    });
  }

}
