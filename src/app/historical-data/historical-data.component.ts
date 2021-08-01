import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../model/exam';

@Component({
  selector: 'historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent {

  @Input() historicExam: Exam;
  @Input() edit: boolean;

}
