import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: OtherInfoComponent
  }]
})
export class OtherInfoComponent implements OnDestroy, ControlValueAccessor {

  constructor(private formBuilder: FormBuilder) {}

  otherInfoForm: FormGroup = this.formBuilder.group({
    frame: [],
    lense: [],
  });

  onChangeSub: Subscription;

  onTouched = () => {};

  writeValue(otherInfo: any): void {
    if (otherInfo) {
      this.otherInfoForm.setValue(otherInfo);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.otherInfoForm.disable();
    } else {
      this.otherInfoForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.otherInfoForm.valueChanges
      .subscribe(form => fn(this.otherInfoForm.value));
  }

  ngOnDestroy(): void {
    // this.onChangeSub.unsubscribe();
  }

}
