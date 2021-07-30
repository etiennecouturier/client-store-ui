import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) {}

  findPhotoByUserName(userName: String): Observable<Blob> {
    return this.http.get(`/photo/${userName}`, { responseType: 'blob' });
  }

}
