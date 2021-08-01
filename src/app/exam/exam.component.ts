import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../model/exam';

@Component({
  selector: 'exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {

  @Input() exam: Exam;
  @Input() edit: boolean;

}
