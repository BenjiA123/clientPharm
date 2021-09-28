import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersDrugDetailComponent } from './customers-drug-detail/customers-drug-detail.component';
import { DrugBookingComponent } from './drug-booking/drug-booking.component';
import { DrugOverviewComponent } from './drug-overview/drug-overview.component';

const routes: Routes = [
  {
    path: "drugs", component: DrugOverviewComponent, children: [

    ]
  },
  { path: "drugs-detail/:id", component: CustomersDrugDetailComponent },
  { path: "bookings", component: DrugBookingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerSectionRoutingModule { }
