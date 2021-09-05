import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment } from "./../../environments/environment";

import { SearchComponent } from './search.component';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SocketIoModule.forRoot(config)
   
  ],
  exports:[SearchComponent]
})
export class SearchModule { }



