import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }



  sendMessage(message: { sender: string, reciever: string, message: string, }) {
    console.log("At service")


  }


}
