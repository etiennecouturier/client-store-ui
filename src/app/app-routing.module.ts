import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {ClientDetailsComponent} from "./client-details/client-details.component";
import {ClientResolver} from "./services/client-resolver.service";
import {StatsComponent} from './stats/stats.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'clients/new',
    component: ClientDetailsComponent
  },
  {
    path: 'clients/:id',
    component: ClientDetailsComponent,
    resolve: {
      client: ClientResolver
    }
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
