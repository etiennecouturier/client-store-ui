import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class PdfService {

  constructor(private http: HttpClient) {}

  download(visitId: String): Observable<Blob> {
    return this.http.get(`/pdf/download/${visitId}`, {
      responseType: 'blob'
    });
  }

}
