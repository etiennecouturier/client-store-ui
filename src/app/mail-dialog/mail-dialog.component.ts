import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MailService} from '../services/mail.service';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Constants} from '../model/constants';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrls: ['./mail-dialog.component.css']
})
export class MailDialogComponent implements OnInit {

  mailForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<MailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public visitId: string,
              private mailService: MailService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {
  }

  templates = [
    {'name': 'vásárlási részletek', 'checked': false},
    {'name': 'szemüveg megérkezett', 'checked': true}
  ];

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      template: [],
      title: [Constants.mailTemplates()[1]['title']],
      body: [Constants.mailTemplates()[1]['body']]
    });

    this.template.valueChanges
      .subscribe(s => {
        this.title.setValue(this.getMailTemplate()['title']);
        this.body.setValue(this.getMailTemplate()['body']);
      });
  }

  sendEmail() {
    this.notifierService.notify('success', 'az email küldés alatt van');
    const formValue = this.mailForm.value;
    formValue.visitId = this.visitId;
    this.mailService
      .sendMail(formValue)
      .subscribe(() => {
      });
  }

  private getMailTemplate() {
    return Constants.mailTemplates()[this.template.value];
  }

  get template() {
    return this.mailForm.controls['template'];
  }

  get body() {
    return this.mailForm.controls['body'];
  }

  get title() {
    return this.mailForm.controls['title'];
  }

}
