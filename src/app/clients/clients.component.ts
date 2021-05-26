import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {catchError, debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {ClientsDataSource} from '../services/clientsDataSource';
import {ClientsService} from '../services/clients.service';
import {HttpService} from '../services/http.service';
import {NotifierService} from 'angular-notifier';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-products-table',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  dataSource: ClientsDataSource;
  displayedColumns = ['name', 'dob', 'tel', 'email', 'actions'];
  pageSize = 10;
  categoryInputText: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('name') nameInput: ElementRef;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private httpService: HttpService,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.dataSource = new ClientsDataSource(this.clientsService);
    this.dataSource.loadClients(this.categoryInputText);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(
      fromEvent(this.nameInput.nativeElement, 'keyup')
    )
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadClientsPage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadClientsPage())
      )
      .subscribe();
  }

  private loadClientsPage() {
    this.dataSource.loadClients(
      this.categoryInputText,
      this.nameInput.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  deleteItem(id) {
    this.httpService.deleteById('/clients/', id)
      .pipe(
        catchError(err => this.notifierService.notify('error', 'Ügyfél nem lett törölve!'))
      )
      .subscribe(() => {
        this.loadClientsPage();
        this.notifierService.notify('success', 'Ügyfél törölve!');
      });
  }

  openDialog(client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: client
    });

    dialogRef.componentInstance.del.subscribe(() => {
      this.deleteItem(client.id);
    });
  }
}
