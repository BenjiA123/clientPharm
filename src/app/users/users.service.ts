import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(limit?: number, sort?: string, page?: number) {
    return this.http.get(`${BACKEND_URL}`)

  }

  getUserByUsername(username) {
    return this.http.get(`${BACKEND_URL}/${username}`)

  }
  inactivateUser(userId: string) {

    return this.http.delete(`${BACKEND_URL}/inactivate/${userId}`)


  }
}
