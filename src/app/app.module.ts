import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {HttpClientModule} from '@angular/common/http';
import {ClientsService} from './services/clients.service';
import {ClientsComponent} from './clients/clients.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {HttpService} from './services/http.service';
import {ChartsModule} from 'ng2-charts';
import {ClientResolver} from './services/client-resolver.service';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {PhonePipe} from './pipes/phone.pipe';
import {CommonModule} from '@angular/common';
import {NotifierModule} from 'angular-notifier';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {VisitComponent} from './visit/visit.component';
import {PhoneMaskDirective} from './directives/phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailsComponent,
    PhonePipe,
    ConfirmDialogComponent,
    VisitComponent,
    PhoneMaskDirective
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
    NotifierModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    ClientsService,
    HttpService,
    ClientResolver,
    {provide: MAT_DATE_LOCALE, useValue: 'hu'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
