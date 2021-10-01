import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription
  private roleListenerSubs: Subscription
  isAuthenticated = false;
  userRole = '';
  isMD: boolean = false;
  isCachier: boolean = false;
  isPharmacist: boolean = false;
  isCustomer: boolean = false;

  constructor(private authService: AuthService) { }

  changeCheckedState(checkbox: any) {
    checkbox.checked = !checkbox.checked
  }



  ngOnInit(): void {

    this.isAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService.getauthStatusListener().subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated

      }
    )


    this.roleListenerSubs = this.authService.getRoleStatusListener().subscribe(
      (userRole) => {
        if (userRole == 'MD') this.isMD = true
        if (userRole == 'cachier') this.isCachier = true
        if (userRole == 'pharmacist') this.isPharmacist = true
        if (userRole == 'customer') this.isCustomer = true
      }
    )


  }
  logout() {
    this.authService.logout()
  }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
    this.roleListenerSubs.unsubscribe()

  }

}
