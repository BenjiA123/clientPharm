import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrugDetailComponent } from './drug-detail/drug-detail.component';

import { DrugsComponent } from './drugs.component';

const routes: Routes = [{
  path: '', component: DrugsComponent
},
{ path: 'detail/:id', component: DrugDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugsRoutingModule { }
