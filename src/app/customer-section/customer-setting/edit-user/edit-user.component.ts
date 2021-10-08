import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import * as fromApp from '../../../store/app.reducer'
import { CustomerSectionService } from '../../customer-section.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  currentUser: any;

  constructor(private csSection: CustomerSectionService, private _dialog: MatDialog,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('AuthState').subscribe(
      (data) => {

        this.currentUser = data.currentUser
      }
    )
  }

  oneditCustomer(editForm: NgForm) {

    if (editForm.form.status != "VALID") {
      alert("Invalid Form, Please fill all the fields")
      return
    }

    this.csSection.editCustomer(editForm.form.value, this.currentUser._id)
      .subscribe((data: any) => {
        delete data.data.document.confirmPassword
        this.currentUser = data.data.document
        this._dialog.open(DialogMessageComponent, {
          data: { message: "You have been updated" }
        })
      })


  }
}