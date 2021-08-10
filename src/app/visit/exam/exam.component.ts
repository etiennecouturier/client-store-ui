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
        rightEye: {
          dioptria: this.examForm.controls['rightDioptria'].value,
          cilinder: this.examForm.controls['rightCilinder'].value,
          fok: this.examForm.controls['rightFok'].value,
          vizus: this.examForm.controls['rightVizus'].value,
          add: this.examForm.controls['rightAdd'].value,
          pd: this.examForm.controls['rightPd'].value,
          bifoMag: this.examForm.controls['rightBifoMag'].value
        },
        leftEye: {
          dioptria: this.examForm.controls['leftDioptria'].value,
          cilinder: this.examForm.controls['leftCilinder'].value,
          fok: this.examForm.controls['leftFok'].value,
          vizus: this.examForm.controls['leftVizus'].value,
          add: this.examForm.controls['leftAdd'].value,
          pd: this.examForm.controls['leftPd'].value,
          bifoMag: this.examForm.controls['leftBifoMag'].value
        },
        notes: this.examForm.controls['notes'].value
      }));
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
