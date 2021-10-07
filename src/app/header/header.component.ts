import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer'



import { map, switchMap, mergeMap, take } from "rxjs/operators";

import * as authActions from '../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isCustomer: boolean = false;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  changeCheckedState(checkbox: any) {
    checkbox.checked = !checkbox.checked
  }
  ngOnInit(): void {
    this.store.select('AuthState').subscribe(
      (data) => {
        this.isAuthenticated = data.isAuthenticated
        let curUser: any = data.currentUser
        let userRole = curUser?.role;
        if (userRole == 'customer') this.isCustomer = true

      }
    )
  }
  logout() {
    this.store.select('AuthState')
      .pipe(
        map((authDetail) => { return authDetail }), take(1)
      ).subscribe(
        (data) => {
          this.store.dispatch(new authActions.StartLogout({ currentUser: data.currentUser }))
        }
      )


  }
}
