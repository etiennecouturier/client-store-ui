import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {ClientsDataSource} from '../datasources/clientsDataSource';
import {ClientsService} from '../services/clients.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-products-table',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  columnDefinitions = [
    {def: 'name', showMobile: true},
    {def: 'dob', showMobile: false},
    {def: 'tel', showMobile: false},
    {def: 'email', showMobile: false},
    {def: 'actions', showMobile: true},
  ];

  dataSource: ClientsDataSource;
  pageSize = 10;
  categoryInputText: string;
  mobile: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('name') nameInput: ElementRef;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.dataSource = new ClientsDataSource(this.clientsService);
    this.dataSource.loadClients(this.categoryInputText);
    this.mobile = this.deviceService.isMobile();
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

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter(cd => !this.mobile || cd.showMobile)
      .map(cd => cd.def);
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
    const response = this.clientsService.deleteById(id);
    response.subscribe(() => {
      this.loadClientsPage();
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
