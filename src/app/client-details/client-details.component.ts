import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Client} from "../model/client";

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  displayedColumns = ['date', 'rightEye.dioptria', 'rightEye.cilinder', 'rightEye.fok', 'rightEye.vizus',
                      'leftEye.dioptria', 'leftEye.cilinder', 'leftEye.fok', 'leftEye.vizus', 'notes', '$$edit'];

  propertyToDisplayedName = new Map([
    ['date', 'Dátum'],
    ['rightEye.dioptria', 'Jobb dioptria'],
    ['rightEye.cilinder', 'Jobb cilinder'],
    ['rightEye.fok', 'Jobb fok'],
    ['rightEye.vizus', 'Jobb vizus'],
    ['leftEye.dioptria', 'Bal dioptria'],
    ['leftEye.cilinder', 'Bal cilinder'],
    ['leftEye.fok', 'Bal fok'],
    ['leftEye.vizus', 'Bal vizus'],
    ['notes', 'Megjegyzések'],
    ['$$edit', '']
  ]);

  public client: Client;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
  }

}
