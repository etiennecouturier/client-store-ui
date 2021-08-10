import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Visit} from '../../model/visit';
import {saveAs} from 'file-saver';
import {NotifierService} from 'angular-notifier';
import {MailService} from '../../services/mail.service';
import {PdfService} from '../../services/pdf.service';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: VisitComponent
  }]
})
export class VisitComponent implements ControlValueAccessor, OnDestroy {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() del: EventEmitter<any> = new EventEmitter();

  visitForm = this.formBuilder.group({
    date: [],
    historicExam: [],
    exam: [],
    contactLenseExam: [],
    fees: [],
    otherInfo: []
  });

  today = new Date();
  edit = false;
  onChangeSub: Subscription;
  private onTouched = () => {};

  constructor(private mailService: MailService,
              private pdfService: PdfService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {
  }

  downloadFile(): void {
    // this.pdfService
    //   .download(this.visit.id)
    //   .subscribe(blob => saveAs(blob, `visit_${this.visit.id}.pdf`));
  }

  sendEmail() {
    // this.notifierService.notify('success', 'az email küldés alatt van');
    // this.mailService
    //   .sendMail(this.visit.id)
    //   .subscribe(() => {
    //     console.log('mail successfully sent');
    //   });
  }

  writeValue(visit: any): void {
    if (visit) {
      this.visitForm.setValue({
        date: visit.date,
        historicExam: visit.historicExam,
        exam: visit.exam,
        contactLenseExam: visit.contactLenseExam,
        fees: visit.fees,
        otherInfo: visit.otherInfo
      });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.visitForm.disable();
    } else {
      this.visitForm.enable();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.visitForm.valueChanges
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    // this.onChangeSub.unsubscribe();
  }

}
