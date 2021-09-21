import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return
    }
    this.authService.login(loginForm.value.username, loginForm.value.password)
  }


}
