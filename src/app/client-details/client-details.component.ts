import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {HttpService} from '../services/http.service';
import {Constants} from '../model/constants';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public client: Client;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
  }

  save() {
    this.httpService.save('/clients/new', this.client);
  }

  addNewVisit() {
    this.client.visits.unshift(Constants.emptyVisit());
  }

}
