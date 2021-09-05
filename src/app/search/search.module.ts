import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
   
  ],
  exports:[SearchComponent]
})
export class SearchModule { }



