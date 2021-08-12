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
      message: [Constants.mailTemplates()[1]]
    });

    this.template.valueChanges
      .subscribe(s => {
        this.message.setValue(Constants.mailTemplates()[this.template.value]);
      });
  }

  sendEmail() {
    this.notifierService.notify('success', 'az email küldés alatt van');
    this.mailService
      .sendMail(this.visitId)
      .subscribe(() => {
      });
  }

  get template() {
    return this.mailForm.controls['template'];
  }

  get message() {
    return this.mailForm.controls['message'];
  }

}
