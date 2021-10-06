import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {


  isAuthenticated = false;
  currentUser: any
  currentUserName: string


  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('AuthState').subscribe(
      (data) => {
        this.isAuthenticated = data.isAuthenticated

        this.currentUser = data.currentUser
        if (data.currentUser) {
          this.currentUserName = this.currentUser.name
        }
      }
    )
  }
}
