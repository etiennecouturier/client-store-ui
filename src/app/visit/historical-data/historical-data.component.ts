import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: HistoricalDataComponent
  }]
})
export class HistoricalDataComponent implements OnDestroy, ControlValueAccessor {

  historicExamForm: FormGroup = this.formBuilder.group({
    rightDioptria: [],
    rightCilinder: [],
    rightFok: [],
    leftDioptria: [],
    leftCilinder: [],
    leftFok: [],
    notes: []
  });

  constructor(private formBuilder: FormBuilder) {
  }

  onChangeSub: Subscription;

  private onTouched = () => {};

  writeValue(historicExam: any): void {
    if (historicExam) {
      this.historicExamForm.setValue({
        rightDioptria: historicExam.rightEye.dioptria,
        rightCilinder: historicExam.rightEye.cilinder,
        rightFok: historicExam.rightEye.fok,
        leftDioptria: historicExam.leftEye.dioptria,
        leftCilinder: historicExam.leftEye.cilinder,
        leftFok: historicExam.leftEye.fok,
        notes: historicExam.notes
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.historicExamForm.disable();
    } else {
      this.historicExamForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.historicExamForm.valueChanges
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
