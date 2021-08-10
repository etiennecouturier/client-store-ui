import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'contact-lense',
  templateUrl: './contact-lense.component.html',
  styleUrls: ['./contact-lense.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ContactLenseComponent
  }]
})
export class ContactLenseComponent implements OnDestroy, ControlValueAccessor {

  contactLenseForm: FormGroup = this.formBuilder.group({
    rightSzaruGorbulet: [],
    rightDioptria: [],
    rightCilinder: [],
    rightFok: [],
    leftSzaruGorbulet: [],
    leftDioptria: [],
    leftCilinder: [],
    leftFok: [],
    notes: []
  });

  onChangeSub: Subscription;

  private onTouched = () => {};

  constructor(private formBuilder: FormBuilder) {
  }

  writeValue(contactLenseExam: any): void {
    if (contactLenseExam) {
      this.contactLenseForm.setValue({
        rightSzaruGorbulet: contactLenseExam.rightEye.szaruGorbulet,
        rightDioptria: contactLenseExam.rightEye.dioptria,
        rightCilinder: contactLenseExam.rightEye.cilinder,
        rightFok: contactLenseExam.rightEye.fok,
        leftSzaruGorbulet: contactLenseExam.leftEye.szaruGorbulet,
        leftDioptria: contactLenseExam.leftEye.dioptria,
        leftCilinder: contactLenseExam.leftEye.cilinder,
        leftFok: contactLenseExam.leftEye.fok,
        notes: contactLenseExam.notes
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.contactLenseForm.disable();
    } else {
      this.contactLenseForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.contactLenseForm.valueChanges
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
