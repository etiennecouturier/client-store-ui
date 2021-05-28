import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visit} from '../model/visit';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  @Input() visit: Visit;
  @Output() save: EventEmitter<any> = new EventEmitter();

  edit = false;

  constructor() { }

  ngOnInit(): void {
  }

}
