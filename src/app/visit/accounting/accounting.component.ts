import {Component, Input} from '@angular/core';
import {Fees} from '../../model/fees';

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent {

  @Input() fees: Fees;

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
