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
  isMD:boolean =false;
  isCachier:boolean =false;
  isPharmacist:boolean =false;

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
        console.log(userRole)
        if(userRole =='MD')this.isMD =true
        if(userRole == 'cachier')this.isCachier=true
        if(userRole == 'pharmacist')this.isPharmacist=true
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
