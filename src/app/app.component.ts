import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';

import * as fromApp from './store/app.reducer';

import * as authActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(
    private store: Store<fromApp.AppState>
  ) {

    this.store.dispatch(new authActions.AutomaticLogin())
  }
}
