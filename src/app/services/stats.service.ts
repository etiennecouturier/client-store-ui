import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountPerDate} from '../model/count-per-date';
import {CountPerAge} from '../model/count-per-age';
import {CountPerSex} from '../model/count-per-sex';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  findVisitCountForLast10Days(): Observable<CountPerDate[]> {
    return this.http.get<CountPerDate[]>('/stats/visit-count-last-10-days');
  }

  findVisitorCountPerAge(): Observable<CountPerAge[]> {
    return this.http.get<CountPerAge[]>('/stats/visitor-count-age');
  }

  findVisitorCountPerSex(): Observable<CountPerSex[]> {
    return this.http.get<CountPerSex[]>('/stats/visitor-count-sex');
  }

}
