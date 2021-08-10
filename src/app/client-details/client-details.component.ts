import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {Constants} from '../model/constants';
import {PhonePipe} from '../pipes/phone.pipe';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ClientsService} from '../services/clients.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public client: Client;
  today = new Date();
  public age: number;

  clientDetailsForm: FormGroup;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private phonePipe: PhonePipe,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    if (!this.client) { this.client = Constants.emptyClient(); }
    this.client.tel = this.phonePipe.transform(this.client.tel);

    this.clientDetailsForm = this.formBuilder.group({
      name: [this.client.name],
      dob: [this.client.dob],
      tel: [this.client.tel],
      email: [this.client.email],
      visits: this.formBuilder.array([])
    });
    this.client.visits.forEach(visit => this.visits.push(this.formBuilder.control(visit)));
  }

  get visits() {
    return this.clientDetailsForm.controls['visits'] as FormArray;
  }

  save() {
    this.clientsService.save(this.client)
      .subscribe(resp => {
        this.client = resp;
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
