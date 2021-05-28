import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {HttpService} from '../services/http.service';
import {Constants} from '../model/constants';
import {response} from 'express';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public client: Client;
  edit = false;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
  }

  save() {
    this.httpService.save('/clients/new', this.client)
      .subscribe(() => {
        this.httpService.find<Client>(
          '/clients/id',
          {id: this.client.id}
        ).subscribe(resp => {
          this.client = resp;
        });
      });
    this.edit = false;
  }

  cancel() {
    this.httpService.find<Client>(
      '/clients/id',
      {id: this.client.id}
    ).subscribe(resp => {
      this.client = resp;
      this.edit = false;
    });
  }

  addNewVisit() {
    this.client.visits.unshift(Constants.emptyVisit());
  }

  deleteVisit(i) {
    this.client.visits.splice(i, 1);
    this.save();
  }
}
