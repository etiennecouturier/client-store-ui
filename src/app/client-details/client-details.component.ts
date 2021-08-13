import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {Constants} from '../model/constants';
import {PhonePipe} from '../pipes/phone.pipe';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ClientsService} from '../services/clients.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id;
  sex;
  today = new Date();

  clientDetailsForm: FormGroup;
  private onChangeSub: Subscription;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private phonePipe: PhonePipe,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    let client: Client = this.route.snapshot.data['client'];
    if (!client) {
      client = Constants.emptyClient();
    }
    this.id = client.id;
    this.sex = client.sex;
    client.tel = this.phonePipe.transform(client.tel);
    this.clientDetailsForm = this.formBuilder.group({
      name: [client.name],
      dob: [client.dob],
      tel: [client.tel],
      email: [client.email],
      visits: this.formBuilder.array([])
    });
    client.visits.forEach(visit => this.visits.push(this.formBuilder.control(visit)));

    this.onChangeSub = this.clientDetailsForm.valueChanges.pipe(
      debounceTime(3000),
      switchMap(formValue => {
        formValue.id = this.id;
        formValue.age = this.calculateAge();
        console.log(formValue);
        return this.clientsService.save(formValue);
      }),
    ).subscribe(res => {
      this.id = res.id;
      this.sex = res.sex;
      this.notifierService.notify('success', 'sikeres mentés');
    });
  }

  addNewVisit() {
    this.visits.push(this.formBuilder.control(Constants.emptyVisit()));
  }

  deleteVisit(i) {
    this.visits.removeAt(i);
  }

  openDeleteConfirmationDialog(index): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: this.clientDetailsForm.value
    }).componentInstance.del.subscribe(() => {
      this.deleteVisit(index);
    });
  }

  calculateAge() {
    if (this.dob) {
      const timeDiff = Math.abs(Date.now() - new Date(this.dob).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }

  get dob() {
    return this.clientDetailsForm.controls['dob'].value;
  }

  get visits() {
    return this.clientDetailsForm.controls['visits'] as FormArray;
  }

}
