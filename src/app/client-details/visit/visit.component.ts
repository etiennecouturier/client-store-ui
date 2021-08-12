import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {saveAs} from 'file-saver';
import {NotifierService} from 'angular-notifier';
import {MailService} from '../../services/mail.service';
import {PdfService} from '../../services/pdf.service';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MailDialogComponent} from '../../mail-dialog/mail-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: VisitComponent
  }]
})
export class VisitComponent implements ControlValueAccessor, OnDestroy {

  @Output() del: EventEmitter<any> = new EventEmitter();

  id;

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

  constructor(private dialog: MatDialog,
              private mailService: MailService,
              private pdfService: PdfService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {
  }

  downloadFile(): void {
    this.pdfService
      .download(this.id)
      .subscribe(blob => saveAs(blob, `visit_${this.id}.pdf`));
  }

  openEmailDialog(): void {
    this.dialog.open(MailDialogComponent, {
      width: '500px',
      data: this.id
    });
  }

  writeValue(visit: any): void {
    this.id = visit.id;
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

  registerOnChange(fn: any): void {
    this.onChangeSub = this.visitForm.valueChanges
      .subscribe(fn);
  }

  ngOnDestroy(): void {
    // this.onChangeSub.unsubscribe();
  }

}
