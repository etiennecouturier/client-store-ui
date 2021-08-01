import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../model/exam';

@Component({
  selector: 'contact-lense',
  templateUrl: './contact-lense.component.html',
  styleUrls: ['./contact-lense.component.css']
})
export class ContactLenseComponent {

  @Input() contactLenseExam: Exam;
  @Input() edit: boolean;

}
