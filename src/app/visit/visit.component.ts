import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visit} from '../model/visit';
import {saveAs} from 'file-saver';
import {NotifierService} from 'angular-notifier';
import {MailService} from '../services/mail.service';
import {PdfService} from '../services/pdf.service';

@Component({
  selector: 'visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent {

  @Input() visit: Visit;
  @Input() anyUnderEdit: boolean;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() del: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() editStarted: EventEmitter<any> = new EventEmitter();

  today = new Date();
  edit = false;

  constructor(private mailService: MailService,
              private pdfService: PdfService,
              private notifierService: NotifierService) {
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
}
