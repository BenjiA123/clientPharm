import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private authListenerSubs: Subscription
  private roleListenerSubs: Subscription
  isAuthenticated = false;
  userRole= '';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.isAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getauthStatusListener().subscribe(
      (isAuthenticated)=>{
        this.isAuthenticated = isAuthenticated

      }
    )


    this.roleListenerSubs = this.authService.getRoleStatusListener().subscribe(
      (userRole)=>{
        this.userRole = userRole
      }
    )

    
  }
  logout(){
    this.authService.logout()
  }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
    this.roleListenerSubs.unsubscribe()
    
  }

}
