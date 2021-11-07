import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispatchRiderSectionComponent } from './dispatch-rider-section.component';

const routes: Routes = [
  { path: "", component: DispatchRiderSectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchRiderSectionRoutingModule { }
