import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {Constants} from '../model/constants';
import {PhonePipe} from '../pipes/phone.pipe';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ClientsService} from '../services/clients.service';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public client: Client;
  today = new Date();
  public age: number;
  edit = false;
  anyUnderEdit = false;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private phonePipe: PhonePipe) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    if (!this.client) { this.client = Constants.emptyClient(); }
    console.log(this.client);
    this.client.tel = this.phonePipe.transform(this.client.tel);
  }

  save() {
    this.clientsService.save(this.client)
      .subscribe(resp => {
        this.client = resp;
        this.edit = false;
        this.anyUnderEdit = false;
      });
  }

  cancel() {
    this.clientsService.find<Client>(
      {id: this.client.id}
    ).subscribe(resp => {
      this.client = resp;
      this.edit = false;
      this.anyUnderEdit = false;
    });
  }

  addNewVisit() {
    this.client.visits.unshift(Constants.emptyVisit());
    this.save();
  }

  deleteVisit(i) {
    this.client.visits.splice(i, 1);
    this.save();
  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: this.client
    });

    dialogRef.componentInstance.del.subscribe(() => {
      this.deleteVisit(index);
    });
  }

  calculateAge() {
    if (this.client.dob) {
      const timeDiff = Math.abs(Date.now() - new Date(this.client.dob).getTime());
      this.client.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age);
    }
  }

}
