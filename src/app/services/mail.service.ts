import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MailService {

  constructor(private http: HttpClient) {}

  sendMail(visitId: String) {
    return this.http.post(`/mail/send/${visitId}`, {});
  }

}
