import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../message.service';
import { environment } from "../../../environments/environment"
import { io } from "socket.io-client";
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { MessageData } from '../message.interface';

const socket = io(environment.baseUrl);
@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  message: any;
  reciverUsername: any;

  constructor(private store: Store<fromApp.AppState>, private usersService: UsersService, private messageService: MessageService, private route: ActivatedRoute) { }

  currentUser: any
  allMessages: any[] = []
  reciverData: any

  ngOnInit(): void {
    this.store.select('AuthState').subscribe(
      (data) => {
        this.currentUser = data.currentUser

      }
    )

    this.route.params
      .subscribe(
        (params: Params) => {
          this.reciverUsername = params['username']
          this.usersService.getUserByUsername(this.reciverUsername)
            .subscribe(
              (reciver: any) => {

                this.reciverData = reciver.data.document

                // Get Id from params
                this.messageService.getAllMessages(this.reciverData._id, this.currentUser._id)
                  .subscribe(
                    (res: any) => {
                      this.allMessages = res.chats;

                    }
                  )

                this.messageService.getAllMessages(this.currentUser._id, this.reciverData._id)
                  .subscribe(
                    (res: any) => {
                      this.allMessages = [...this.allMessages.concat(res.chats)];
                      this.allMessages = this.allMessages.sort((b: MessageData, a: MessageData) => {
                        // Converting the dates to numbers and comparing them to sort the messages
                        return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * -1
                      });
                    }
                  )



              }
            )

        }
      )



  }
  sendMessage(messageForm: NgForm) {
    if (messageForm.form.value.message.split(" ") == null) { alert("Please input a value"); return } //If the message is underfined
    const message = {
      sender: this.currentUser._id,
      reciever: this.reciverData._id,
      message: messageForm.form.value.message,
    }

    this.sendSocketMessage(message)
    messageForm.reset()
  }
  sendSocketMessage(message: { sender: string, reciever: string, message: string }) {
    socket.emit("sendDirectMessage", message);
    socket.on("messageResult", (messageData: any) => {
      console.log("This is being emitted form the other side")
      console.log(messageData)
      this.allMessages.push(messageData)
    })
  }

}
