import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isAuthenticated = false;
  currentUser: any
  currentUserName: string

  constructor(private authService: AuthService, private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editPassword(editPassForm: NgForm) {

    if (editPassForm.invalid) {
      return
    }

    if (editPassForm.form.value.password != editPassForm.form.value.confirmPassword) {
      alert("Password and Password Confirm must be equal")
      return
    }


    console.log(editPassForm.form.value)
    let passData = editPassForm.form.value

    this.authService.changePassword(
      {
        currentPassword: passData.currentPassword,
        password: passData.password,
        confirmPassword: passData.confirmPassword
      }).subscribe(
        (res: any) => {


          this._dialog.open(DialogMessageComponent, {
            data: { message: "Password Updated" }
          })

        }
      )
  }

}
