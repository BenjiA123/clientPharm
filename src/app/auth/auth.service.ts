import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private isAuthenticated = false
private roleStatusListener = new BehaviorSubject<string>('')
private authStatusListener = new BehaviorSubject<boolean>(false)
private token: string
private role: string
private userId: string
private currentUser:any



  constructor(private http:HttpClient, private router :Router) { }

  login(username:string,password:string){

    this.http.post(`${BACKEND_URL}/login`,{username,password})
    .subscribe(
      (res:any)=>
      {
        this.token = res.token
        this.role = res.user.role
        this.currentUser = res.user


        if(this.token)
        {
          this.isAuthenticated = true
          this.userId = res.user._id
          this.authStatusListener.next(true)
          this.roleStatusListener.next(this.role)

          this.saveAuthData(this.token,null,this.userId)

          if(this.role === 'MD')
          {
          this.router.navigate(["/charts"])

          }else if (this.role === 'pharmacist')
          this.router.navigate(["/drugs"])
        }else if (this.role === '')
        {
          this.router.navigate(["/cachier"])

        }
        else{
          alert(res.message)
        }

        error => {
          this.authStatusListener.next(false)
          this.roleStatusListener.next('')

        }
        
      }
    )

    

  }

  getToken(){
    return this.token
  }

  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getRoleStatusListener() {
    return this.roleStatusListener.asObservable();
  }

  getRole() {
    return this.role
  }

  getCurrentUser() {
    return this.currentUser
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token)
    // localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userId', userId)

  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.userId = null
    this.authStatusListener.next(false)
    this.router.navigate(["/"])
  }



}
