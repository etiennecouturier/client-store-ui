import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../model/client';
import {HttpService} from '../services/http.service';
import {Visit} from '../model/visit';


@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  newVisit: Visit = {
    date: new Date(),
    rightEye: {
      dioptria: 0,
      cilinder: 0,
      fok: 0,
      vizus: 0
    },
    leftEye: {
      dioptria: 0,
      cilinder: 0,
      fok: 0,
      vizus: 0
    },
    notes: ''
  };
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

}
