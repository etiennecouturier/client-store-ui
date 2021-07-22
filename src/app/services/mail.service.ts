import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';


@Injectable()
export class MailService {

  constructor(private http: HttpClient,
              private notifierService: NotifierService) {}

  sendMail(visitId: String) {
    return this.http.post(`/mail/send/${visitId}`, {})
      .pipe(
        tap(
          () => this.notifierService.notify('success', 'email sikeresen elküldve')
        ));
  }

}
