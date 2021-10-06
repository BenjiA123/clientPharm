import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

import * as authActions from './store/auth.actions'

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false
  private roleStatusListener = new BehaviorSubject<string>('')
  private authStatusListener = new BehaviorSubject<boolean>(false)
  private loadingStatusListener = new BehaviorSubject<boolean>(false)
  private token: string
  private role: string
  private userId: string
  private currentUser: any



  constructor(private http: HttpClient,
    private router: Router,
    private cookies: CookieService,
    private _dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) { }

  login(username: string, password: string) {

    this.loadingStatusListener.next(true)

    this.http.post(`${BACKEND_URL}/login`, { username, password }, { observe: 'response' })
      .subscribe(
        (res: any) => {

          this.loadingStatusListener.next(false)

          this.authStatusListener.next(false)


          res = res.body
          this.token = this.cookies.get('jwt')
          this.role = res.user.role
          this.currentUser = res.user


          if (this.token) {
            this.isAuthenticated = true
            this.userId = res.user._id

            this.roleStatusListener.next(this.role)

            this.authStatusListener.next(true)



            // this.store.dispatch(new authActions.Login(
            //   {
            //     token: this.cookies.get('jwt'),
            //     role: res.user.role,
            //     currentUser: res.user
            //   }))



            if (this.role == 'MD') { this.router.navigate(["/charts"]) }
            else if (this.role == 'cachier') { this.router.navigate(["/transactions"]) }
            else if (this.role == 'pharmacist') { this.router.navigate(["/drugs"]) }
            else if (this.role == 'customer') { this.router.navigate(["/customer/drugs"]) }

            else {
              this.router.navigate(["/"])
            }

          }
          else {

            this._dialog.open(DialogMessageComponent, {
              data: { message: "Please Allow Cookies" }
            })
          }



        },
        error => {
          this.authStatusListener.next(false)
          this.roleStatusListener.next('')
          this.loadingStatusListener.next(false)


        }
      )



  }



  getLoadingStatusListener() {
    return this.loadingStatusListener.asObservable()
  }


  getCurrentUser() {
    return this.currentUser
  }



  logout() {
    // Send a Logout request
    this.http.post(`${BACKEND_URL}/logout`, { user: this.currentUser })
      .subscribe(res => {

        this.store.dispatch(new authActions.Logout())
        this.token = null
        this.isAuthenticated = false
        this.userId = null
        this.authStatusListener.next(false)

        this.router.navigate(["/"])


      })
  }

  createUserPassword(token: string, password: string, confirmPassword: string) {
    // i will set the status to true here and change it to false in the component
    return this.http.post(`${BACKEND_URL}/create-password/${token}`, { password, confirmPassword })
  }

}
