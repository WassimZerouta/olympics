import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsCountryComponent } from './pages/details-country/details-country.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
     path: 'details/:id',
      component: DetailsCountryComponent 
  },
  {
    path: '**', 
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
