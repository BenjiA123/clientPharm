import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/chat";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }



  getAllMessages(reciever: string, sender: string) {
    return this.http.post(`${BACKEND_URL}`, { reciever, sender })
  }


}
