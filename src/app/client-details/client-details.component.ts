import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {HttpService} from '../services/http.service';
import {Constants} from '../model/constants';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public client: Client;
  public age: number;
  edit = false;
  anyUnderEdit = false;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    this.calculateAge();
  }

  save() {
    this.httpService.save('/clients/new', this.client)
      .subscribe(resp => {
        this.client = resp;
        this.notifierService.notify('success', 'Mentés sikeres!');
      });
    this.edit = false;
    this.anyUnderEdit = false;
  }

  cancel() {
    this.httpService.find<Client>(
      '/clients/id',
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

  calculateAge() {
    if (this.client.dob) {
      const timeDiff = Math.abs(Date.now() - new Date(this.client.dob).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age);
    }
  }

}
