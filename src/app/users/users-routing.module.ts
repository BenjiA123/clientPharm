import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:'',component:UsersComponent,
  children:[
    { path: ':detail', component: UsersDetailComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
