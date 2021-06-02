import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visit} from '../model/visit';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  @Input() visit: Visit;
  @Input() anyUnderEdit: boolean;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() del: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() editStarted: EventEmitter<any> = new EventEmitter();

  today = new Date();
  edit = false;

  constructor() { }

  ngOnInit(): void {
  }

}
