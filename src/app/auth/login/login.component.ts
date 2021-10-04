import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return
    }


    this.authService.login(loginForm.value.username, loginForm.value.password)
    this.store.dispatch(new AuthActions.TryLogin({ username: loginForm.value.username, password: loginForm.value.password }))
  }


}
