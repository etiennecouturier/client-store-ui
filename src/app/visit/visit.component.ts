import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visit} from '../model/visit';
import {HttpService} from '../services/http.service';
import { saveAs } from 'file-saver';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  @Input() visit: Visit;
  @Input() anyUnderEdit: boolean;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() del: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() editStarted: EventEmitter<any> = new EventEmitter();

  today = new Date();
  edit = false;

  constructor(private httpService: HttpService,
              private notifierService: NotifierService) {}

  ngOnInit(): void {}

  calculateTotal() {
    this.visit.fees.total =
      this.visit.fees.frame
      + this.visit.fees.rightLense
      + this.visit.fees.leftLense
      + this.visit.fees.service
      + this.visit.fees.exam
      + this.visit.fees.other;
    return this.visit.fees.total;
  }

  calculateDiscount() {
    this.visit.fees.discountAmount = Math.round(this.calculateTotal() * this.visit.fees.discountPercent / 100);
    return this.visit.fees.discountAmount;
  }

  calculateToBePaid() {
    this.visit.fees.toBePaid = this.calculateTotal() - this.calculateDiscount() - this.visit.fees.paid;
    return this.visit.fees.toBePaid;
  }

  downloadFile(): void {
    this.httpService
      .download(this.visit.id)
      .subscribe(blob => saveAs(blob, `visit_${this.visit.id}.pdf`));
  }

  sendEmail() {
    this.notifierService.notify('success', 'az email küldés alatt van');
    this.httpService
      .sendMail(this.visit.id)
      .subscribe(() => {
        console.log('mail successfully sent');
      });
  }
}
