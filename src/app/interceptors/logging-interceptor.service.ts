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
        () => {},
        error => this.notifierService.notify('error', error.error.message)
      ));
  }

}
