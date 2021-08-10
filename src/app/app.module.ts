import {BrowserModule} from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClientsService} from './services/clients.service';
import {ClientsComponent} from './clients/clients.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {ChartsModule} from 'ng2-charts';
import {ClientResolver} from './resolvers/client-resolver.service';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {PhonePipe} from './pipes/phone.pipe';
import {CommonModule} from '@angular/common';
import {NotifierModule} from 'angular-notifier';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {VisitComponent} from './client-details/visit/visit.component';
import {PhoneMaskDirective} from './directives/phone-mask.directive';
import {LoggingInterceptor} from './interceptors/logging-interceptor.service';
import {StatsComponent} from './stats/stats.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './login/login.component';
import {AuthService} from './services/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthGuardInterceptorService} from './interceptors/auth-guard-interceptor.service';
import {UrlInterceptor} from './interceptors/url-interceptor.service';
import {RegistrationComponent} from './registration/registration.component';
import {StatsService} from './services/stats.service';
import {PdfService} from './services/pdf.service';
import {MailService} from './services/mail.service';
import {UserService} from './services/user.service';
import {PhotoService} from './services/photo.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ContactLenseComponent} from './client-details/visit/contact-lense/contact-lense.component';
import {AccountingComponent} from './client-details/visit/accounting/accounting.component';
import {ExamComponent} from './client-details/visit/exam/exam.component';
import {HistoricalDataComponent} from './client-details/visit/historical-data/historical-data.component';
import { OtherInfoComponent } from './client-details/visit/other-info/other-info.component';
import { MailDialogComponent } from './mail-dialog/mail-dialog.component';

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptor,
  multi: true
};

const URL_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailsComponent,
    PhonePipe,
    ConfirmDialogComponent,
    VisitComponent,
    PhoneMaskDirective,
    StatsComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    HistoricalDataComponent,
    ExamComponent,
    ContactLenseComponent,
    AccountingComponent,
    OtherInfoComponent,
    MailDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    ChartsModule,
    NotifierModule.withConfig({
      behaviour: {
        autoHide: 1000
      }
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardInterceptorService,
    ClientsService,
    ClientResolver,
    MailService,
    PdfService,
    PhonePipe,
    PhotoService,
    StatsService,
    UserService,
    LOGGING_INTERCEPTOR_PROVIDER,
    URL_INTERCEPTOR_PROVIDER,
    {provide: MAT_DATE_LOCALE, useValue: 'hu'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
