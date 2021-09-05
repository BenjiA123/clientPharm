import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
@NgModule({
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    FormsModule
    ]
})
export class AngularMaterialModule {

}