import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AccountingComponent
  }]
})
export class AccountingComponent implements OnDestroy, ControlValueAccessor {

  accountingForm: FormGroup = this.formBuilder.group({
    frame: [],
    rightLense: [],
    leftLense: [],
    service: [],
    exam: [],
    other: [],
    discountPercent: [],
    paid: []
  });

  onChangeSub: Subscription;

  onTouched = () => {
  };

  constructor(private formBuilder: FormBuilder) {
  }

  fees(conotrolName) {
    return this.accountingForm.controls[conotrolName].value;
  }

  calculateTotal() {
    return this.fees('frame')
      + this.fees('rightLense')
      + this.fees('leftLense')
      + this.fees('service')
      + this.fees('exam')
      + this.fees('other');
  }

  calculateDiscountAmount() {
    return Math.round(this.calculateTotal() * this.fees('discountPercent') / 100);
  }

  calculateToBePaid() {
    return this.calculateTotal() - this.calculateDiscountAmount() - this.fees('paid');
  }

  writeValue(fees: any): void {
    if (fees) {
      this.accountingForm.setValue({
        frame: fees.frame,
        rightLense: fees.rightLense,
        leftLense: fees.leftLense,
        service: fees.service,
        exam: fees.exam,
        other: fees.other,
        discountPercent: fees.discountPercent,
        paid: fees.paid
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.accountingForm.valueChanges
      .subscribe(formValue => {
        formValue.total = this.calculateTotal();
        formValue.discountAmount = this.calculateDiscountAmount();
        formValue.toBePaid = this.calculateToBePaid();
        fn(formValue);
      });
  }

  ngOnDestroy(): void {
    // this.onChangeSub.unsubscribe();
  }

}
