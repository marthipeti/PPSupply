import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MachineListPageComponent } from '../machine-list-page/machine-list-page.component';
import { ReservationListPageComponent } from '../reservation-list-page/reservation-list-page.component';

const routes: Route[] = [
  { path: '', component: MachineListPageComponent },
  { path: 'my-reservations', component: ReservationListPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
