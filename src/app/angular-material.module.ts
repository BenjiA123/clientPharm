import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatAutocompleteModule,

        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule
    ]
})
export class AngularMaterialModule {

}