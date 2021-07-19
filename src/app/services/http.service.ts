import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  find<T>(url: string, params: any = {}): Observable<T> {
    return this.http.get<T>(url, { params : params });
  }

  deleteById(url: string, id: number): Observable<Object> {
    return this.http.delete(url + id);
  }

  save<T>(url: string, elem: T) {
    return this.http.post<T>(url, elem, {});
  }

  download(visitId: String): Observable<Blob> {
    return this.http.get(`/pdf/download/${visitId}`, {
      responseType: 'blob'
    });
  }

  sendMail(visitId: String) {
    return this.http.post(`/mail/send/${visitId}`, {});
  }

}
