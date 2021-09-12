import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDetailComponent } from './create-detail/create-detail.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  {path:"",component:CreateComponent, children:[
    {path:":detail",component:CreateDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
