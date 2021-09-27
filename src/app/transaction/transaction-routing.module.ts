import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactioDetailComponent } from './transactio-detail/transactio-detail.component';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  { path: '', component: TransactionComponent },
  { path: 'detail/:id', component: TransactioDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
