import {Component, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'accounting',
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
    paid: [],
    total: [{value: 0, disabled: true}],
    discountAmount: [{value: 0, disabled: true}],
    toBePaid: [{value: 0, disabled: true}]
  });

  onChangeSub: Subscription;

  onTouched = () => {};

  constructor(private formBuilder: FormBuilder) {}

  // calculateTotal() {
  //   this.accountingForm.controls['total'].setValue(
  //     this.fees.frame
  //     + this.fees.rightLense
  //     + this.fees.leftLense
  //     + this.fees.service
  //     + this.fees.exam
  //     + this.fees.other);
  //   return this.fees.total;
  // }
  //
  // calculateDiscount() {
  //   this.fees.discountAmount = Math.round(this.calculateTotal() * this.fees.discountPercent / 100);
  //   return this.fees.discountAmount;
  // }
  //
  // calculateToBePaid() {
  //   this.fees.toBePaid = this.calculateTotal() - this.calculateDiscount() - this.fees.paid;
  //   return this.fees.toBePaid;
  // }

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
        paid: fees.paid,
        total: fees.total,
        discountAmount: fees.discountAmount,
        toBePaid: fees.toBePaid
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.accountingForm.disable();
    } else {
      this.accountingForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.accountingForm.valueChanges
      .subscribe(form => fn(this.accountingForm.value));
  }

  ngOnDestroy(): void {
    // this.onChangeSub.unsubscribe();
  }

}
