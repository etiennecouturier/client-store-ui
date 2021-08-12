import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {MailContent} from '../model/mail-content';


@Injectable()
export class MailService {

  constructor(private http: HttpClient,
              private notifierService: NotifierService) {}

  sendMail(mailContent: MailContent) {
    return this.http.post(`/mail/send`, mailContent)
      .pipe(
        tap(
          () => this.notifierService.notify('success', 'email sikeresen elküldve')
        ));
  }

}
