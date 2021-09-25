import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessageComponent } from './message.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [MessageComponent, MessageDetailsComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    AngularMaterialModule
  ]
})
export class MessageModule { }
