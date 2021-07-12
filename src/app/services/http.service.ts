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

  download(visitId: String): Observable<Blob> {
    return this.http.get(`${environment.baseUrl}/pdf/download/${visitId}`, {
      responseType: 'blob'
    });
  }

  sendMail(visitId: String) {
    return this.http.post(`${environment.baseUrl}/mail/send/${visitId}`, {});
  }

}
