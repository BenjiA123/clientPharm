import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onLogin(loginForm:NgForm){
    if(loginForm.invalid)
    {
      return
    }
    this.authService.login(loginForm.value.username,loginForm.value.password)
  }

}
