import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../model/client';
import {MailService} from '../services/mail.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'mail-dialog',
  templateUrl: './mail-dialog.component.html',
  styleUrls: ['./mail-dialog.component.css']
})
export class MailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Client,
              private mailService: MailService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.notifierService.notify('success', 'az email küldés alatt van');
    this.mailService
      .sendMail('')
      .subscribe(() => {
        console.log('mail successfully sent');
      });
  }

}
