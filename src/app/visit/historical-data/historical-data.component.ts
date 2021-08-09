import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../../model/exam';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {

  @Input() historicExam: Exam;

  historicExamForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.historicExamForm = this.formBuilder.group({
      rightDioptria: [this.historicExam.rightEye.dioptria],
      rightCilinder: [this.historicExam.rightEye.cilinder],
      rightFok: [this.historicExam.rightEye.fok],
      leftDioptria: [this.historicExam.leftEye.dioptria],
      leftCilinder: [this.historicExam.leftEye.cilinder],
      leftFok: [this.historicExam.leftEye.fok],
      notes: [this.historicExam.notes]
    });

    this.historicExamForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => Observable.create(console.log(this.historicExamForm))),
    ).subscribe(res => console.log('Saved'));
  }

}
