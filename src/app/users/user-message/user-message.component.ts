import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

import { environment } from "../../../environments/environment"
import { io } from "socket.io-client";
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'
import { MatSnackBar } from '@angular/material/snack-bar';

const socket = io(environment.baseUrl);

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private _dialog: MatDialog, private _snackBar: MatSnackBar
    , private store: Store<fromApp.AppState>,
    private usersService: UsersService) { }
  currentRoute: any
  recieverUserData: any
  ngOnInit() {



    this.store.select('AuthState').subscribe(
      (data: any) => {
        this.currentUser = data.currentUser
      }
    )





    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRoute = params['detail']

          this.usersService.getUserByUsername(this.currentRoute)
            .subscribe(
              (currentUser: any) => {
                this.recieverUserData = currentUser.data.document
              }
            )

        }
      )

  }


  onmessageUser(messageForm: NgForm) {
    if (messageForm.form.status != "VALID") {
      alert("Invalid Message")
      return
    }
    if (messageForm.form.value.message == "") return

    const message = {
      sender: this.currentUser?._id,
      reciever: this.recieverUserData._id,
      message: messageForm.form.value.message,
      type: 'emailMessage'
    }
    this._snackBar.open("LoAdinG......")

    socket.emit("sendEmailMessage", message);
    socket.on("emailMessageResult", (messageData: any) => {
      this._snackBar.dismiss()

      this._dialog.open(DialogMessageComponent, {
        data: { message: messageData }
      })
    })


  }
}
