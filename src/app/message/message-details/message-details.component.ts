import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from '../message.service';



import { environment } from "../../../environments/environment"



import { io } from "socket.io-client";

const socket = io(environment.baseUrl);


@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService) { }

  currentUser: any
  allMessages = []

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser()
  }

  sendMessage(messageForm: NgForm) {

    if (messageForm.form.value.message == "") return

    const message = {


      sender: "613c37c4762cdf3828dd02ad",
      reciever: this.currentUser._id,
      message: messageForm.form.value.message,
    }




    this.sendSocketMessage(message)



  }
  sendSocketMessage(message) {

    socket.emit("sendDirectMessage", message);

    socket.on("messageResult", (messageData: any) => {
      this.allMessages.push(messageData)
      console.log(messageData)
    })
  }

}
