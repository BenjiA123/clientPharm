import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

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
  private currentUser: any



  constructor(private http: HttpClient, private router: Router, private cookies: CookieService) { }

  login(username: string, password: string) {
    this.http.post(`${BACKEND_URL}/login`, { username, password }, { observe: 'response' })
      .subscribe(
        (res: any) => {

          res = res.body
          this.token = this.cookies.get('jwt')
          this.role = res.user.role
          this.currentUser = res.user


          if (this.token) {
            this.isAuthenticated = true
            this.userId = res.user._id
            this.authStatusListener.next(true)
            this.roleStatusListener.next(this.role)



            if (this.role == 'MD') { this.router.navigate(["/charts"]) }
            else if (this.role == 'cachier') { this.router.navigate(["/transactions"]) }
            else if (this.role == 'pharmacist') { this.router.navigate(["/drugs"]) }

            else {
              this.router.navigate(["/"])
            }

          }
          else {
            alert(res.message)
          }

          error => {
            this.authStatusListener.next(false)
            this.roleStatusListener.next('')

          }

        }
      )



  }

  getToken() {
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


  logout() {
    // Send a Logout request
    this.http.post(`${BACKEND_URL}/logout`, { user: this.currentUser })
      .subscribe(res => {

        this.token = null
        this.isAuthenticated = false
        this.userId = null
        this.authStatusListener.next(false)
        this.router.navigate(["/"])


      })
  }

  automaticLogin() {
    if (this.cookies.get('jwt')) {
      this.http.get(`${BACKEND_URL}/get-logged-in-user`)
        .subscribe(
          (res: any) => {


            this.role = res.user.role
            this.currentUser = res.user


            this.userId = res.user._id
            this.roleStatusListener.next(this.role)




            this.isAuthenticated = true
            this.authStatusListener.next(true)
            this.token = this.cookies.get('jwt')

          }
        )


    }
  }

  createUser(signUpData: any) {
    this.http.post(`${BACKEND_URL}`, signUpData)
      .subscribe(res => { console.log(res) })
  }

  createUserPassword(token: string, password: string, passwordConfirm: string) {
    return this.http.post(`${BACKEND_URL}/create-password/${token}`, { password, passwordConfirm })
  }

}
