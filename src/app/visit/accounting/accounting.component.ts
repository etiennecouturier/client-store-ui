import {Component, Input, OnInit} from '@angular/core';
import {Fees} from '../../model/fees';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  @Input() fees: Fees;

  accountingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.accountingForm = this.formBuilder.group({
      frame: [this.fees.frame],
      rightLense: [this.fees.rightLense],
      leftLense: [this.fees.leftLense],
      service: [this.fees.service],
      exam: [this.fees.exam],
      other: [this.fees.other],
      discountPercent: [this.fees.discountPercent],
      paid: [this.fees.paid],
      total: [{value: this.fees.total, disabled: true}],
      discountAmount: [{value: this.fees.discountAmount, disabled: true}],
      toBePaid: [{value: this.fees.toBePaid, disabled: true}]
    });

    this.accountingForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => Observable.create(console.log(this.accountingForm))),
    ).subscribe(res => console.log('Saved'));
  }

  calculateTotal() {
    this.fees.total =
      this.fees.frame
      + this.fees.rightLense
      + this.fees.leftLense
      + this.fees.service
      + this.fees.exam
      + this.fees.other;
    return this.fees.total;
  }

  calculateDiscount() {
    this.fees.discountAmount = Math.round(this.calculateTotal() * this.fees.discountPercent / 100);
    return this.fees.discountAmount;
  }

  calculateToBePaid() {
    this.fees.toBePaid = this.calculateTotal() - this.calculateDiscount() - this.fees.paid;
    return this.fees.toBePaid;
  }

}
