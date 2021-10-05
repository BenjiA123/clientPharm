import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMessageComponent } from './user-message/user-message.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: ':detail', component: UsersDetailComponent },
      { path: ':detail/edit', component: UsersEditComponent },
      { path: ':detail/message', component: UserMessageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
