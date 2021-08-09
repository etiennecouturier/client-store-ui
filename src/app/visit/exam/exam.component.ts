import {Component, Input, OnDestroy} from '@angular/core';
import {Exam} from '../../model/exam';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ExamComponent
  }]
})
export class ExamComponent implements OnDestroy, ControlValueAccessor {

  @Input() exam: Exam;

  examForm: FormGroup = this.formBuilder.group({
    rightDioptria: [],
    rightCilinder: [],
    rightFok: [],
    rightVizus: [],
    rightAdd: [],
    rightPd: [],
    rightBifoMag: [],
    leftDioptria: [],
    leftCilinder: [],
    leftFok: [],
    leftVizus: [],
    leftAdd: [],
    leftPd: [],
    leftBifoMag: [],
    notes: []
  });

  onChangeSub: Subscription;

  private onTouched = () => {};

  constructor(private formBuilder: FormBuilder) {
  }

  writeValue(exam: any): void {
    if (exam) {
      this.examForm.setValue({
        rightDioptria: this.exam.rightEye.dioptria,
        rightCilinder: this.exam.rightEye.cilinder,
        rightFok: this.exam.rightEye.fok,
        rightVizus: this.exam.rightEye.vizus,
        rightAdd: this.exam.rightEye.add,
        rightPd: this.exam.rightEye.pd,
        rightBifoMag: this.exam.rightEye.bifoMag,
        leftDioptria: this.exam.leftEye.dioptria,
        leftCilinder: this.exam.leftEye.cilinder,
        leftFok: this.exam.leftEye.fok,
        leftVizus: this.exam.leftEye.vizus,
        leftAdd: this.exam.leftEye.add,
        leftPd: this.exam.leftEye.pd,
        leftBifoMag: this.exam.leftEye.bifoMag,
        notes: this.exam.notes
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.examForm.disable();
    } else {
      this.examForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.examForm.valueChanges
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
