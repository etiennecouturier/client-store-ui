import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../../model/exam';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  @Input() exam: Exam;

  examForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.examForm = this.formBuilder.group({
      rightDioptria: [this.exam.rightEye.dioptria],
      rightCilinder: [this.exam.rightEye.cilinder],
      rightFok: [this.exam.rightEye.fok],
      rightVizus: [this.exam.rightEye.vizus],
      rightAdd: [this.exam.rightEye.add],
      rightPd: [this.exam.rightEye.pd],
      rightBifoMag: [this.exam.rightEye.bifoMag],
      leftDioptria: [this.exam.leftEye.dioptria],
      leftCilinder: [this.exam.leftEye.cilinder],
      leftFok: [this.exam.leftEye.fok],
      leftVizus: [this.exam.leftEye.vizus],
      leftAdd: [this.exam.leftEye.add],
      leftPd: [this.exam.leftEye.pd],
      leftBifoMag: [this.exam.leftEye.bifoMag],
      notes: [this.exam.notes]
    });

    this.examForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => Observable.create(console.log(this.examForm))),
    ).subscribe(res => console.log('Saved'));
  }

}
