import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: OtherInfoComponent
  }]
})
export class OtherInfoComponent implements OnInit, OnDestroy, ControlValueAccessor {

  constructor(private formBuilder: FormBuilder) {}

  otherInfoForm: FormGroup = this.formBuilder.group({
    frame: [],
    lense: [],
  });

  onChangeSub: Subscription;

  private onTouched = () => {};

  ngOnInit(): void {
    console.log('INIT');
  }

  writeValue(obj: any): void {
    if (obj) {
      this.otherInfoForm.setValue(obj);
      console.log(this.otherInfoForm.value);
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
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
