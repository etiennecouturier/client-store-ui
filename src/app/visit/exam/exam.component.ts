import {Component, OnDestroy} from '@angular/core';
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

  private onTouched = () => {
  };

  constructor(private formBuilder: FormBuilder) {
  }

  writeValue(exam: any): void {
    if (exam) {
      this.examForm.setValue({
        rightDioptria: exam.rightEye.dioptria,
        rightCilinder: exam.rightEye.cilinder,
        rightFok: exam.rightEye.fok,
        rightVizus: exam.rightEye.vizus,
        rightAdd: exam.rightEye.add,
        rightPd: exam.rightEye.pd,
        rightBifoMag: exam.rightEye.bifoMag,
        leftDioptria: exam.leftEye.dioptria,
        leftCilinder: exam.leftEye.cilinder,
        leftFok: exam.leftEye.fok,
        leftVizus: exam.leftEye.vizus,
        leftAdd: exam.leftEye.add,
        leftPd: exam.leftEye.pd,
        leftBifoMag: exam.leftEye.bifoMag,
        notes: exam.notes
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
      .subscribe(form => fn({
        exam: {
          rightEye: {
            dioptria: this.examForm.controls['rightDioptria'].value,
            cilinder: null,
            fok: null,
            vizus: null,
            szaruGorbulet: null,
            add: null,
            pd: null,
            bifoMag: null
          },
          leftEye: {
            dioptria: null,
            cilinder: null,
            fok: null,
            vizus: null,
            szaruGorbulet: null,
            add: null,
            pd: null,
            bifoMag: null
          },
          notes: null
        }
      }));
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
