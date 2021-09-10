import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  
  private authListenerSubs: Subscription
  isAuthenticated = false;
  currentUser:any
  currentUserName:string


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.automaticLogin()

    this.authListenerSubs = this.authService.getauthStatusListener().subscribe(
      (isAuthenticated)=>{
        this.isAuthenticated = isAuthenticated

        this.currentUser = this.authService.getCurrentUser()
        if(this.currentUser){
          this.currentUserName = this.currentUser.name
          console.log(this.currentUser.name)
        }


      }
    )    
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  
  }










}
