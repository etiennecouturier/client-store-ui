import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Visit} from '../model/visit';
import {saveAs} from 'file-saver';
import {NotifierService} from 'angular-notifier';
import {MailService} from '../services/mail.service';
import {PdfService} from '../services/pdf.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit, OnDestroy {

  @Input() visit: Visit;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() del: EventEmitter<any> = new EventEmitter();

  today = new Date();
  edit = false;
  visitForm: FormGroup;
  onChangeSub: Subscription;

  constructor(private mailService: MailService,
              private pdfService: PdfService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.visitForm = this.formBuilder.group({
      date: [this.visit.date],
      historicExam: [this.visit.historicExam],
      exam: [this.visit.exam],
      contactLenseExam: [this.visit.contactLenseExam],
      fees: [this.visit.fees],
      otherInfo: [this.visit]
    });

    this.onChangeSub = this.visitForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => of(formValue)),
    ).subscribe((a) => console.log(a));
  }

  downloadFile(): void {
    this.pdfService
      .download(this.visit.id)
      .subscribe(blob => saveAs(blob, `visit_${this.visit.id}.pdf`));
  }

  sendEmail() {
    this.notifierService.notify('success', 'az email küldés alatt van');
    this.mailService
      .sendMail(this.visit.id)
      .subscribe(() => {
        console.log('mail successfully sent');
      });
  }


  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}
