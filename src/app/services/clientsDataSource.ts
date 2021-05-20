import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {Client} from '../model/client';
import {ClientsService} from './clients.service';
import {Page} from '../model/page';


export class ClientsDataSource implements DataSource<Client> {

  private clientsSubject = new BehaviorSubject<Client[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public dataLength$;

  constructor(private clientsService: ClientsService) {
  }

  loadClients(category: string = '',
              name: string = '',
              sortBy: string = 'name',
              sortDirection: string = 'asc',
              pageIndex: number = 0,
              pageSize: number = 10) {

    this.loadingSubject.next(true);

    this.clientsService.findClients(name, sortBy, sortDirection, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((page: Page<Client>) => {
      console.log(page);
      this.dataLength$ = page.totalElements;
      this.clientsSubject.next(page.content);
    });

  }

  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    console.log('Connecting data source');
    return this.clientsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clientsSubject.complete();
    this.loadingSubject.complete();
  }

}

