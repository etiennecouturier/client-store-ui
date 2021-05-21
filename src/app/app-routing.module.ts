import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {ClientDetailsComponent} from "./client-details/client-details.component";
import {ClientResolver} from "./services/client-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent

  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'clients/:id',
    component: ClientDetailsComponent,
    resolve: {
      product: ClientResolver
    }
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
