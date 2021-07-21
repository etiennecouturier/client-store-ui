import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private notifierService: NotifierService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        response => {
          if (response instanceof HttpResponse) {
            if (response.status === 201 || response.status === 204) {
              this.notifierService.notify('success', 'sikeres művelet');
            }
          }
        },
        error => this.notifierService.notify('error', 'sikertelen művelet: ' + error.error.message)
      ));
  }

}
