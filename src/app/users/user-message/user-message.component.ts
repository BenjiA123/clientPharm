import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';


import { environment } from "../../../environments/environment"
import { io } from "socket.io-client";
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';

const socket = io(environment.baseUrl);

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  currentUser: any;

  constructor(private route: ActivatedRoute, private _dialog: MatDialog, private authService: AuthService, private usersService: UsersService) { }
  currentRoute: any
  currentUserData: any
  ngOnInit() {

    this.currentUser = this.authService.getCurrentUser()

    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRoute = params['detail']

          this.usersService.getUserByUsername(this.currentRoute)
            .subscribe(
              (currentUser: any) => {
                this.currentUserData = currentUser.data.document
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
      sender: this.currentUser._id,
      reciever: this.currentUserData._id,
      message: messageForm.form.value.message,
      type: 'emailMessage'
    }

    socket.emit("sendEmailMessage", message);
    socket.on("emailMessageResult", (messageData: any) => {

      this._dialog.open(DialogMessageComponent, {
        data: { message: messageData }
      })
    })


  }
}
