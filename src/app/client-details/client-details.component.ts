import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from "../model/client";

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  displayedColumns = ['date', 'jobb-dioptria', 'jobb-cilinder', 'jobb-fok', 'jobb-vizus',
                      'bal-dioptria', 'bal-cilinder', 'bal-fok', 'bal-vizus', 'notes'];
  public client: Client;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.client = this.route.snapshot.data['client'];
  }

}
