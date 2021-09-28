import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessageComponent } from './message.component';

const routes: Routes = [
  {
    path: "", component: MessageComponent, children: [
      { path: ":username", component: MessageDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
