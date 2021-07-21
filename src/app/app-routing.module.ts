import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {ClientResolver} from './resolvers/client-resolver.service';
import {StatsComponent} from './stats/stats.component';
import {LoginComponent} from './login/login.component';
import {
  AuthGuardInterceptorService as AuthGuard
} from './interceptors/auth-guard-interceptor.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/new',
    component: ClientDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/:id',
    component: ClientDetailsComponent,
    resolve: {
      client: ClientResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/clients'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
